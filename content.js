// content.js — PRO (robusto)
// - Estratégias de envio: enter, click, both
// - Espera por tempo e/ou detecção de geração (stop-button)
// - Pausar/Retomar/Cancelar
// - Retries por prompt

const SLEEP = (ms) => new Promise(r => setTimeout(r, ms));
let QUEUE = [];
let RUNNING = false;
let PAUSED = false;
let CANCELLED = false;
let SETTINGS = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "processQueue") {
    QUEUE = msg.prompts.slice();
    SETTINGS = msg.settings || {};
    PAUSED = false; CANCELLED = false;
    if (!RUNNING) runQueue();
    sendResponse({ok:true});
  }
  if (msg.type === "controlQueue") {
    if (msg.action === "pause") PAUSED = true;
    if (msg.action === "resume") PAUSED = false;
    if (msg.action === "cancel") { CANCELLED = true; PAUSED=false; }
    sendResponse && sendResponse({ok:true});
  }
});

async function runQueue(){
  RUNNING = true;
  try {
    while (QUEUE.length && !CANCELLED) {
      if (PAUSED) { await SLEEP(500); continue; }
      const item = QUEUE.shift();
      let ok = await sendOne(item);
      if (!ok) {
        console.warn("ForjaElo: falhou ao enviar:", item);
      }
      const fixed = Number(SETTINGS.delay||0)*1000;
      const jmin = Number(SETTINGS.jitterMin||0)*1000;
      const jmax = Number(SETTINGS.jitterMax||0)*1000;
      const jitter = (jmax>jmin) ? (Math.random()*(jmax-jmin)+jmin) : (jmin||0);
      await SLEEP(fixed + jitter);
    }
  } finally {
    RUNNING = false;
  }
}

async function sendOne(text){
  const retries = Number(SETTINGS.retries||0);
  for (let attempt=0; attempt<=retries; attempt++) {
    try {
      const box = await ensurePromptBox();
      if (!box) throw new Error("prompt box not found");

      await setValue(box, text);
      await SLEEP(120);

      const strategy = SETTINGS.strategy || "both";
      if (strategy === "enter" || strategy === "both") await pressEnter(box);
      if (strategy === "click" || strategy === "both") await clickSendButton();

      if (SETTINGS.waitMode === "detectStream") {
        // esperar iniciar geração (stop-button aparece)
        await waitForStart(SETTINGS.maxWait||120);
        // esperar fim da geração (stop-button some)
        await waitForFinish(SETTINGS.maxWait||120);
      }
      return true;
    } catch (e) {
      console.warn("sendOne attempt failed:", e);
      await SLEEP(800);
    }
  }
  return false;
}

async function ensurePromptBox(){
  for (let i=0;i<5;i++){
    let el = document.querySelector("textarea#prompt-textarea");
    if (el) return el;
    el = document.querySelector("textarea[tabindex]");
    if (el) return el;
    const edit = Array.from(document.querySelectorAll('[contenteditable="true"]')).find(x => x.role !== "button");
    if (edit) return edit;
    await SLEEP(600);
  }
  return null;
}

async function setValue(el, text){
  if (el.tagName === "TEXTAREA") {
    el.value = text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    el.focus();
    document.execCommand("selectAll", false, null);
    document.execCommand("insertText", false, text);
  }
}

async function pressEnter(el){
  el.focus();
  const e = new KeyboardEvent("keydown", { key:"Enter", code:"Enter", which:13, keyCode:13, bubbles:true });
  el.dispatchEvent(e);
}

async function clickSendButton(){
  // tenta alguns seletores comuns
  const selectors = [
    'button[data-testid="send-button"]',
    'button[aria-label*="Send"]',
    'button[aria-label*="Enviar"]',
    'form button[type="submit"]'
  ];
  for (let i=0;i<selectors.length;i++){
    const btn = document.querySelector(selectors[i]);
    if (btn) { btn.click(); return; }
  }
}

async function waitForStart(maxSec){
  const start = Date.now();
  while (Date.now()-start < maxSec*1000) {
    const stopBtn = document.querySelector('button[data-testid="stop-button"], button[aria-label*="Stop"]');
    if (stopBtn) return true;
    await SLEEP(150);
  }
  return false;
}
async function waitForFinish(maxSec){
  const start = Date.now();
  while (Date.now()-start < maxSec*1000) {
    const stopBtn = document.querySelector('button[data-testid="stop-button"], button[aria-label*="Stop"]');
    if (!stopBtn) return true;
    await SLEEP(250);
  }
  return false;
}
