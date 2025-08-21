// Minimal offline service worker for ChatGPT Queue
// Manages the local message queue and communicates with the content script.

// Initialize default prompt delay on first install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(
    ['promptDelay', 'promptDelayMin', 'promptDelayMax'],
    (data) => {
      let { promptDelayMin: min, promptDelayMax: max, promptDelay } = data;
      if (min === undefined || max === undefined) {
        min = 10000;
        max = 30000;
        chrome.storage.local.set({ promptDelayMin: min, promptDelayMax: max });
      }
      if (promptDelay === undefined) {
        const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        chrome.storage.local.set({ promptDelay: randomDelay });
      }
    }
  );

  // Open ChatGPT automatically on first installation
  const redirectUrl = chrome.runtime.getURL('redirect.html');
  chrome.tabs.create({ url: redirectUrl });
});

// Store log entries safely
function addLog(entry, level = 'info') {
  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs;
    logs.push({ time: new Date().toISOString(), level, entry });
    if (logs.length > 1000) logs.shift();
    chrome.storage.local.set({ logs });
  });
}

// Show a user notification when important issues occur
function notify(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon-128.png',
      title: 'SSA - SERVO SEM ALMA',
    message,
  });
}

// Notify all tabs that queue data has changed
function notifyQueueUpdated() {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type: "queueUpdated" });
    }
  });
}

// Remove an item from the stored queue
function deleteQueueItem(index) {
  chrome.storage.local.get("queuedMessages", (data) => {
    const queue = data.queuedMessages || [];
    if (index >= 0 && index < queue.length) {
      queue.splice(index, 1);
      chrome.storage.local.set({ queuedMessages: queue }, notifyQueueUpdated);
    }
  });
}

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getFirstFiveWords(prompt) {
  return prompt.trim().split(/\s+/).slice(0, 5).join(' ');
}

const toolKeywords = {
  'ForjaElo · SSA (Organizador)': ['forjaelo', 'ssa'],
  'ForjaElo · Scorecard (CSV)': ['forjaelo', 'scorecard'],
  'ForjaElo · Devocional 15min': ['forjaelo', 'devocional', '15'],
  'ForjaElo · Processo em 7 passos': ['forjaelo', 'processo', '7'],
  'ForjaElo · Roteiro Ide (90s)': ['forjaelo', 'roteiro', 'ide'],
  'ForjaElo · Detox 24h': ['forjaelo', 'detox', '24h']
};

function detectTool(prompt) {
  const firstFive = getFirstFiveWords(normalize(prompt));
  const words = firstFive.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/gi, ''));
  for (const [toolName, keywords] of Object.entries(toolKeywords)) {
    const matches = keywords.every((k) => words.includes(k));
    if (matches) return toolName;
  }
  return '';
}

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "deleteQueueItem") {
    deleteQueueItem(request.index);
  } else if (request.action === "openPopup") {
    chrome.action.openPopup();
  } else if (request.type === "log") {
    addLog(request.message, request.level || 'info');
  } else if (request.type === "getLogs") {
    chrome.storage.local.get({ logs: [] }, (data) => {
      sendResponse({ logs: data.logs });
    });
    return true;
  } else if (request.type === "status") {
    sendResponse({ status: "serviço em segundo plano em execução" });
  } else if (request.type === "notify") {
    notify(request.message || 'Notificação');
  }
  return true;
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-chatgpt') {
    const url = chrome.runtime.getURL('redirect.html');
    chrome.tabs.create({ url });
  } else if (command === 'apply-tool') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'applyToolClipboardAutomation', shortcut: 'Ctrl+Shift+2' });
      }
    });
  } else if (command === 'paste-automation') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'pasteStartAutomation', shortcut: 'Ctrl+Shift+3' });
      }
    });
  } else if (command === 'copy-json-result') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'copyResult', shortcut: 'Ctrl+Shift+4' });
      }
    });
  }
});

if (typeof logger !== 'undefined' && logger.wrapObject) {
  logger.wrapObject({
    addLog,
    notify,
    notifyQueueUpdated,
    deleteQueueItem,
    normalize,
    getFirstFiveWords,
    detectTool,
  }, 'background.');
}
