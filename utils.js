(function (global, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    global.utils = factory();
  }
}(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  function normalize(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function getFirstFiveWords(prompt) {
    return prompt.trim().split(/\s+/).slice(0, 5).join(' ');
  }

  function splitMessages(text) {
    return text
      .split('~')
      .map(m => m.trim())
      .filter(Boolean);
  }

  const toolKeywords = {
    'Criar imagem': ['criar', 'imagem'],
    'Pensar por mais tempo': ['pensar', 'por', 'mais', 'tempo'],
    'Investigar': ['investigar'],
    'Busca na Web': ['busca', 'na', 'web'],
    'Lousa': ['lousa'],
    'ForjaElo · SSA (Organizador)': ['forjaelo', 'ssa'],
    'ForjaElo · Scorecard (CSV)': ['forjaelo', 'scorecard'],
    'ForjaElo · Devocional 15min': ['forjaelo', 'devocional', '15'],
    'ForjaElo · Processo em 7 passos': ['forjaelo', 'processo', '7'],
    'ForjaElo · Roteiro Ide (90s)': ['forjaelo', 'roteiro', 'ide'],
    'ForjaElo · Detox 24h': ['forjaelo', 'detox', '24h']
  };

  function detectTool(prompt) {
    const firstFive = getFirstFiveWords(normalize(prompt));
    const words = firstFive.split(/\s+/).map(w => w.replace(/[^a-z0-9]/gi, ''));
    for (const [toolName, keywords] of Object.entries(toolKeywords)) {
      const matches = keywords.every(k => words.includes(k));
      if (matches) return toolName;
    }
    return '';
  }

  function randomDelay(min, max) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const api = { normalize, getFirstFiveWords, splitMessages, detectTool, randomDelay };
  if (typeof logger !== 'undefined' && logger.wrapObject) {
    logger.wrapObject(api, 'utils.');
  }
  return api;
}));
