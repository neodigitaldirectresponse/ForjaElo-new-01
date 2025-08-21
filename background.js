// background.js — PRO
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "enqueue") {
    (async () => {
      try {
        const tab = await ensureChatTab();
        await chrome.tabs.sendMessage(tab.id, { type:"processQueue", prompts: msg.prompts, settings: msg.settings });
        sendResponse({ok:true});
      } catch (e) {
        console.error(e); sendResponse({ok:false, error:String(e)});
      }
    })();
    return true;
  }
  if (msg.type === "control") {
    (async () => {
      try {
        const tab = await ensureChatTab();
        await chrome.tabs.sendMessage(tab.id, { type:"controlQueue", action: msg.action });
        sendResponse({ok:true});
      } catch (e) {
        console.error(e); sendResponse({ok:false, error:String(e)});
      }
    })();
    return true;
  }
});

async function ensureChatTab() {
  const tabs = await chrome.tabs.query({ url: "*://*.chatgpt.com/*" });
  if (tabs && tabs.length) return tabs[0];
  const tabs2 = await chrome.tabs.query({ url: "*://chat.openai.com/*" });
  if (tabs2 && tabs2.length) return tabs2[0];
  return await chrome.tabs.create({ url: "https://chat.openai.com/" });
}
