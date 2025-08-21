// popup.js — PRO
const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

// ---- Trilhas A–N (mesmo conteúdo funcional do pacote anterior) ----
// popup.js — ForjaElo 6.7 · SSA 8.7
// Salva/recupera estado, gera filas com "~" e dispara para content.js

const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

// === Templates das Trilhas (A–N) ===
// Cada trilha tem: id, nome, fields (campos "Base:") e um builder que retorna array de prompts
const TRILHAS = [
  {
    id: "A",
    nome: "A) Dia Completo (abrange todos os elos)",
    fields: [
      {key:"agenda", label:"Agenda do dia + contexto"},
      {key:"prioridades", label:"Prioridades (Topo)"},
      {key:"ruidos", label:"Fontes de distração"},
      {key:"tarefas_criticas", label:"Tarefas críticas (T2)"},
      {key:"preferencias", label:"Preferências/Condições (Box)"},
      {key:"ambiente", label:"Ambiente (Refúgio/ritual)"},
      {key:"escopo", label:"Escopo do principal"},
      {key:"log", label:"Log rápido"},
      {key:"resultados", label:"Resultados do dia"}
    ],
    build: (v) => [
      `SSA, sintetize meu “porquê de hoje” (Chama 5) em 1 frase e liste 3 sinais visíveis de progresso. Base: ‹${v.agenda||""}›.`,
      `SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.prioridades||""}›.`,
      `SSA, defina limites (Central): padrão neutro, avisos de “limitar exposição”, janelas de e-mail/mensagens e no-go list. Base: ‹${v.ruidos||""}›.`,
      `SSA, formate um checklist Potência (5–7 itens) com timers (25/5) para executar o T2; inclua checkpoints, travas e critério de “pronto”. Base: ‹${v.tarefas_criticas||""}›.`,
      `SSA, proponha 1 microtreino Box (≤10 min) para energia mental/física antes do bloco principal; inclua como medir (0–5). Base: ‹${v.preferencias||""}›.`,
      `SSA, crie Elo do Refúgio: ritual de 3–5 min (desligar, respirar, anotar 1 insight) com gatilho e horário. Base: ‹${v.ambiente||""}›.`,
      `SSA, desenhe Sprint10 (10 passos curtos) para fechar o principal do dia até as 20:00, com timers e travas objetivas. Base: ‹${v.escopo||""}›.`,
      `SSA, registre métrica leve do dia: esforço/energia/atrito/progresso (0–5) + 3 aprendizados. Base: ‹${v.log||""}›.`,
      `SSA, faça revisão EOD em 6 bullets (feito/pendente/atrito/aprendizados/agradecer/próximo foco) e gere o Top-3 neutro de amanhã. Base: ‹${v.resultados||""}›.`
    ]
  },
  {
    id: "B",
    nome: "B) Projeto (zero → envio)",
    fields: [
      {key:"briefing", label:"Briefing/Projeto"},
      {key:"escopo", label:"Escopo"},
      {key:"pipeline", label:"Pipeline/Processos"},
      {key:"stakeholders", label:"Stakeholders/decisão"},
      {key:"preferencias", label:"Preferências (Box)"},
      {key:"parcerias", label:"Parcerias/Leads (Ide)"},
      {key:"agenda", label:"Agenda/Pausas"},
      {key:"entrega", label:"Entrega-alvo (D1)"}
    ],
    build: (v) => [
      `SSA, com base no texto abaixo, crie: (1) objetivo em 1 frase; (2) 3 passos mínimos; (3) travas + Sprint10. Texto: ‹${v.briefing||""}›.`,
      `SSA, descreva o resultado esperado (T2 Resultado) em 1 frase e 3 critérios de excelência (Talentos). Base: ‹${v.escopo||""}›.`,
      `SSA, mapeie processos (Potência): checklist curto (5–7) com timers e checkpoints; inclua “pronto/feito”. Base: ‹${v.pipeline||""}›.`,
      `SSA, defina limites (Central) específicos do projeto: canais, horários, pontos de decisão; inclua aviso padrão de “limitar exposição”. Base: ‹${v.stakeholders||""}›.`,
      `SSA, proponha microtreino Box (≤10 min) para iniciar os blocos e reduzir atrito. Base: ‹${v.preferencias||""}›.`,
      `SSA, gere 2 roteiros Ide sem dados sensíveis: (a) convite frio de 3 linhas; (b) follow-up curto com CTA. Base: ‹${v.parcerias||""}›.`,
      `SSA, crie Elo do Refúgio para pausas estratégicas (3–5 min, passos claros). Base: ‹${v.agenda||""}›.`,
      `SSA, desenhe Sprint10 para o primeiro envio (D1) com estimativas rápidas, travas e “corte seguro”. Base: ‹${v.entrega||""}›.`
    ]
  },
  {
    id: "C",
    nome: "C) Semana Completa",
    fields: [
      {key:"metas", label:"Metas/resultados-chave"},
      {key:"calendario", label:"Calendário da semana"},
      {key:"rotina", label:"Rotina/Contexto profundo"},
      {key:"tipo_trabalho", label:"Tipo de trabalho (QA/empacote)"},
      {key:"preferencias", label:"Preferências Box"},
      {key:"leads", label:"Leads/Lista (Ide)"},
      {key:"energia", label:"Energia/Descanso"},
      {key:"backlog", label:"Backlog"},
      {key:"registros", label:"Registros para retro"}
    ],
    build: (v) => [
      `SSA, consolide meu Propósito da semana (Chama) em 1 frase e 3 resultados-chave observáveis. Base: ‹${v.metas||""}›.`,
      `SSA, gere um Roadmap Potência (processos + timers) para 5 dias: blocos focais/delivery/revisão. Base: ‹${v.calendario||""}›.`,
      `SSA, estabeleça padrões Central: janelas de comunicação, regras de contexto profundo, e checklist “entrar/sair de foco”. Base: ‹${v.rotina||""}›.`,
      `SSA, defina critérios Talentos (excelência/QA) e template de empacotamento de entregas. Base: ‹${v.tipo_trabalho||""}›.`,
      `SSA, agende microtreinos Box (≤10 min) distribuídos na semana (força, mobilidade, respiração). Base: ‹${v.preferencias||""}›.`,
      `SSA, crie 3 roteiros Ide (contato inicial, nurture curto, fechamento com CTA) sem dados sensíveis. Base: ‹${v.leads||""}›.`,
      `SSA, janelas Refúgio (descanso/detox): horários, rituais e limites práticos. Base: ‹${v.energia||""}›.`,
      `SSA, Sprint10 semanal: 10 passos de execução com checkpoints por dia. Base: ‹${v.backlog||""}›.`,
      `SSA, retro semanal em 8 bullets (ganhos, perdas, atritos, riscos, oportunidades, aprendizados, descarte, foco seguinte). Base: ‹${v.registros||""}›.`
    ]
  },
  {
    id: "D",
    nome: "D) Funil de Parcerias (Ide + Resultado)",
    fields: [
      {key:"produto", label:"Produto/serviço (proposta de valor)"},
      {key:"perfil", label:"Perfil do contato"},
      {key:"meta_contatos", label:"Meta de contatos"},
      {key:"etica", label:"Ética/limites"}
    ],
    build: (v) => [
      `SSA, extraia proposta de valor em 1 frase e 3 provas de credibilidade. Base: ‹${v.produto||""}›.`,
      `SSA, crie 3 roteiros Ide sem dados sensíveis: DM curta, e-mail de 4 linhas e mensagem de follow-up (72h) — cada um com CTA. Base: ‹${v.perfil||""}›.`,
      `SSA, monte checklist Potência (5–7) com timers para disparo, registro, qualificação e revisão diária do funil (T2 Resultado). Base: ‹${v.meta_contatos||""}›.`,
      `SSA, defina travas Central: limites por dia, horário de outreach e regras de não-insistência. Base: ‹${v.etica||""}›.`,
      `SSA, Sprint10 para “primeiros 10 contatos” com checkpoints objetivos e “stop-loss” de tempo. Base: ‹${v.meta_contatos||""}›.`
    ]
  },
  {
    id: "E",
    nome: "E) Qualidade & Excelência (Talentos)",
    fields: [
      {key:"entrega", label:"Entrega"},
      {key:"workflow", label:"Workflow/QA"},
      {key:"prazos", label:"Prazos"}
    ],
    build: (v) => [
      `SSA, descreva “o que é excelente” em 1 frase e defina 3 critérios mensuráveis de QA. Base: ‹${v.entrega||""}›.`,
      `SSA, gere checklist Potência de QA (5–7) com timers por etapa (rascunho → revisão → empacote → envio). Base: ‹${v.workflow||""}›.`,
      `SSA, inclua travas para não-perfeccionismo (Central): limite de revisões e gatilho de envio. Base: ‹${v.prazos||""}›.`,
      `SSA, Sprint10 de empacotamento (10 passos curtos) para fechar hoje. Base: ‹${v.entrega||""}›.`
    ]
  },
  {
    id: "F",
    nome: "F) Foco Profundo (proteção + execução)",
    fields: [
      {key:"tarefa", label:"Tarefa / Bloco principal"},
      {key:"setup", label:"Setup de foco (ambiente/notifs)"},
      {key:"subtarefas", label:"Subtarefas"},
      {key:"preferencias", label:"Preferências Box"},
      {key:"observacoes", label:"Observações"}
    ],
    build: (v) => [
      `SSA, resuma o propósito do bloco em 1 frase e derive 3 micro-metas não negociáveis. Base: ‹${v.tarefa||""}›.`,
      `SSA, defina protocolo Central “entrar em foco”: ambiente, notificações, lista de corte e tempo total. Base: ‹${v.setup||""}›.`,
      `SSA, checklist Potência com timers (25/5) para as 3 micro-metas e checkpoint de meio do bloco. Base: ‹${v.subtarefas||""}›.`,
      `SSA, microtreino Box de 5–8 min (respiração + mobilidade) para antes/depois. Base: ‹${v.preferencias||""}›.`,
      `SSA, mini-retro (EOB): feito, atrito, uma melhoria. Base: ‹${v.observacoes||""}›.`
    ]
  },
  {
    id: "G",
    nome: "G) Energia & Antifragilidade (Box + Refúgio)",
    fields: [
      {key:"condicao", label:"Condição do dia (0–5)"},
      {key:"ambiente", label:"Ambiente (gatilhos)"},
      {key:"rotina", label:"Rotina (retorno ao foco)"},
      {key:"top3", label:"Top‑3 do dia"}
    ],
    build: (v) => [
      `SSA, avalie energia (0–5) e proponha 2 microtreinos Box (≤10 min): um de ativação e um de recuperação. Base: ‹${v.condicao||""}›.`,
      `SSA, crie Elo do Refúgio (3–5 min) com passos claros e gatilho contextual. Base: ‹${v.ambiente||""}›.`,
      `SSA, defina “zona segura” Central para pausas: duração, frequência e regras de retorno ao foco. Base: ‹${v.rotina||""}›.`,
      `SSA, checklist Potência para integrar treino/pausas sem quebrar o T2 do dia. Base: ‹${v.top3||""}›.`
    ]
  },
  {
    id: "H",
    nome: "H) Limites & Comunhão (Central)",
    fields: [
      {key:"ruidos", label:"Fontes de ruído/distração"},
      {key:"relacoes", label:"Relacionamentos/Times"},
      {key:"governanca", label:"Governança/Decisão"}
    ],
    build: (v) => [
      `SSA, mapeie ruídos e distrações e formule 5 avisos prontos de “limitar exposição” para diferentes contextos (reunião, chat, e-mail, família, social). Base: ‹${v.ruidos||""}›.`,
      `SSA, desenhe um protocolo de “contexto neutro”: como pedir/ativar e quando encerrar. Base: ‹${v.relacoes||""}›.`,
      `SSA, defina janelas de comunicação e escadas de decisão (quem decide o quê e quando). Base: ‹${v.governanca||""}›.`
    ]
  },
  {
    id: "I",
    nome: "I) Finanças & Resultado (Talentos)",
    fields: [
      {key:"negocio", label:"Negócio (modelo simples)"},
      {key:"planilha", label:"Planilha simples (descrição)"},
      {key:"regras", label:"Regras/limites"}
    ],
    build: (v) => [
      `SSA, derive 3 indicadores simples de resultado (receita, margem, tickets/semana) e metas de curto prazo. Base: ‹${v.negocio||""}›.`,
      `SSA, crie checklist Potência (5–7) para registro financeiro básico diário (entradas/saídas/observações). Base: ‹${v.planilha||""}›.`,
      `SSA, defina travas Central: tetos de gasto, aprovações e janela de revisão semanal. Base: ‹${v.regras||""}›.`
    ]
  },
  {
    id: "J",
    nome: "J) Crise/Incêndio (corte seguro)",
    fields: [
      {key:"situacao", label:"Situação/Problema"},
      {key:"agenda", label:"Agenda a pausar"},
      {key:"recursos", label:"Recursos disponíveis"},
      {key:"stakeholders", label:"Stakeholders"},
      {key:"aprendizados", label:"Aprendizados"}
    ],
    build: (v) => [
      `SSA, sintetize o problema em 1 frase e 3 consequências se nada for feito. Base: ‹${v.situacao||""}›.`,
      `SSA, gere um “corte seguro” (Central): o que pausar/adiar e por quanto tempo. Base: ‹${v.agenda||""}›.`,
      `SSA, Sprint10 emergencial: 10 passos curtos para estabilizar em 90–120 min, com timers e pontos de não-retorno. Base: ‹${v.recursos||""}›.`,
      `SSA, plano de comunicação (Ide) em 3 bullets para partes interessadas (sem dados sensíveis). Base: ‹${v.stakeholders||""}›.`,
      `SSA, lições rápidas (3 bullets) e critério para encerrar o modo crise. Base: ‹${v.aprendizados||""}›.`
    ]
  },
  {
    id: "K",
    nome: "K) Revisão Diária & Arquivação",
    fields: [
      {key:"log", label:"Log do dia"},
      {key:"prioridades", label:"Prioridades (amanhã)"},
      {key:"preferencias", label:"Preferências de template (registros)"}
    ],
    build: (v) => [
      `SSA, faça uma revisão em 6 bullets: feito/pendente/atrito/aprendizados/agradecer/próximo foco. Base: ‹${v.log||""}›.`,
      `SSA, gere meu Top-3 neutro de amanhã: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.prioridades||""}›.`,
      `SSA, crie um template de “Registros” (anotações fáceis) com campos: data, foco, decisões, riscos, métrica 0–5 e anexos. Base: ‹${v.preferencias||""}›.`
    ]
  },
  {
    id: "L",
    nome: "L) Biblioteca de Mensagens (Ide)",
    fields: [
      {key:"perfil", label:"Perfil do contato"},
      {key:"funil", label:"Funil/processo"}
    ],
    build: (v) => [
      `SSA, gere 4 roteiros Ide sem dados sensíveis: (1) pedido de contexto, (2) convite para chamada de 15 min, (3) agradecimento + próximo passo, (4) follow-up curto pós-reunião; todos com 1 CTA claro. Base: ‹${v.perfil||""}›.`,
      `SSA, checklist Potência para enviar e registrar respostas em até 30 min/dia, com timers e limites (Central). Base: ‹${v.funi||v.funil||""}›.`
    ]
  },
  {
    id: "M",
    nome: "M) Aprendizado Contínuo",
    fields: [
      {key:"tema", label:"Tema de estudo"},
      {key:"hipoteses", label:"Hipóteses/Experimentos"},
      {key:"calendario", label:"Calendário/Proteção de blocos"}
    ],
    build: (v) => [
      `SSA, crie um “Diário de Aprendizado” com campos: insight, onde usei, próximo experimento, escore 0–5. Base: ‹${v.tema||""}›.`,
      `SSA, Sprint10 de experimentos (10 micro-testes) com estimativas rápidas e critério de descarte. Base: ‹${v.hipoteses||""}›.`,
      `SSA, protocolo Central para encerrar experimentos e proteger blocos de entrega. Base: ‹${v.calendario||""}›.`
    ]
  },
  {
    id: "N",
    nome: "N) Top‑3 Neutro (rápido)",
    fields: [
      {key:"agenda", label:"Agenda + prioridades"},
      {key:"tarefas", label:"Tarefas (T2)"},
      {key:"rotina", label:"Rotina/energia"}
    ],
    build: (v) => [
      `SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.agenda||""}›.`,
      `SSA, formate checklist Potência para o T2 com timers (25/5) e Sprint10 final de revisão. Base: ‹${v.tarefas||""}›.`,
      `SSA, defina uma janela Refúgio (15–20 min) e 1 microtreino Box (≤10 min) para sustentar energia. Base: ‹${v.rotina||""}›.`
    ]
  }
];


// ================== UI / ESTADO ==================
let state = {
  trilha: "A",
  values: {},
  settings: {
    delay:2, jitterMin:0, jitterMax:0, mode:"auto",
    strategy:"both", waitMode:"timeOnly", maxWait:120, retries:1
  },
  generated: ""
};
// Defaults prontos por trilha (sem precisar preencher Base:)
const DEFAULTS = {
  A: { agenda: "Dia padrão sem dados sensíveis; foco em 1 entrega principal.",
       prioridades: "T1: propósito claro; T2: resultado mínimo viável; T3: compromisso do calendário.",
       ruidos: "Desligar notificações e evitar atividades paralelas não essenciais.",
       tarefas_criticas: "Fechar rascunho e revisar rapidamente antes de enviar.",
       preferencias: "Box curto (respiração 4-7-8 + alongamento leve).",
       ambiente: "Mesa limpa, abas essenciais, sem celular à vista.",
       escopo: "Empacotar o essencial (sem perfumaria); definição de pronto objetiva.",
       log: "Anotações breves durante o dia (3 bullets).",
       resultados: "Registro de envio e aprendizados do dia." },
  B: { briefing: "Projeto genérico (MVP com 3 partes). Evitar dados sensíveis.",
       escopo: "Primeira versão funcional, sem polimento.",
       pipeline: "Rascunho -> Revisão -> Empacote -> Envio.",
       stakeholders: "Decisão rápida com quem executa; comunicar mudanças de escopo.",
       preferencias: "Box antes do bloco principal, ≤10min.",
       parcerias: "Mensagens curtas e educadas, sem dados sensíveis.",
       agenda: "Pausas a cada 60–90min.",
       entrega: "Primeiro envio (D1) hoje, com corte seguro." },
  C: { metas: "Dois resultados visíveis ao fim da semana.",
       calendario: "Blocos focais na manhã; reuniões à tarde.",
       rotina: "Rituais de entrada/saída do foco; e-mail em janelas.",
       tipo_trabalho: "QA objetivo: critérios mensuráveis.",
       preferencias: "Mobilidade/respiração 10min/dia.",
       leads: "Lista fria (sem dados sensíveis).",
       energia: "Refúgio 20min/dia, detox de redes.",
       backlog: "Top‑15 tarefas priorizadas.",
       registros: "Ganhos, perdas, atritos e aprendizados." },
  D: { produto: "Proposta de valor simples e verificável.",
       perfil: "Contato padrão (profissional).",
       meta_contatos: "Primeiros 10 contatos qualificados.",
       etica: "Não insistir além de 2 follow-ups; respeitar horários." },
  E: { entrega: "Entrega padrão com critérios de qualidade.",
       workflow: "Rascunho -> Revisão -> Empacote -> Envio.",
       prazos: "Fechar hoje com limite de revisões." },
  F: { tarefa: "Bloco principal de foco profundo.",
       setup: "Ambiente neutro, notificações off, tempo delimitado.",
       subtarefas: "3 micro‑metas claras e verificáveis.",
       preferencias: "Box 5–8min (respiração + mobilidade).",
       observacoes: "Nota de atritos e melhorias." },
  G: { condicao: "Energia moderada (3/5); ajustar carga.",
       ambiente: "Gatilho de pausa curta (levantar/respirar).",
       rotina: "Pausas programadas com retorno ao foco.",
       top3: "Top‑3 do dia com T2 executável." },
  H: { ruidos: "Reuniões não essenciais; chats ruidosos; notificações.",
       relacoes: "Pedir contexto neutro quando necessário.",
       governanca: "Escala de decisão simples por área." },
  I: { negocio: "Modelo simples: receita, margem, tickets/semana.",
       planilha: "Registro básico diário (entradas/saídas).",
       regras: "Tetos de gasto e revisão semanal." },
  J: { situacao: "Prazo crítico e/ou bug importante.",
       agenda: "Pausar tarefas não essenciais.",
       recursos: "Time mínimo e ferramentas essenciais.",
       stakeholders: "Comunicação objetiva com partes interessadas.",
       aprendizados: "Lições rápidas após estabilizar." },
  K: { log: "Resumo do dia (feito/pendente/atrito).",
       prioridades: "Três prioridades de amanhã.",
       preferencias: "Template simples de registros." },
  L: { perfil: "Contato profissional padrão.",
       funil: "Enviar, registrar respostas em até 30min/dia." },
  M: { tema: "Assunto de interesse atual.",
       hipoteses: "Conjunto de micro‑experimentos.",
       calendario: "Proteger blocos de entrega e de estudo." },
  N: { agenda: "Agenda concisa do dia.",
       tarefas: "Conjunto de tarefas do T2.",
       rotina: "Janela de Refúgio e Box curto." }
};

function buildQueueFromDefaults(trilhaId){
  const t = TRILHAS.find(x=>x.id===trilhaId);
  if(!t) return "";
  const vals = DEFAULTS[trilhaId] || {};
  const arr = t.build(vals);
  return arr.join("~");
}
function buildAllDefaults(){
  const parts = [];
  TRILHAS.forEach(t => {
    const vals = DEFAULTS[t.id] || {};
    parts.push(...t.build(vals));
  });
  return parts.join("~");
}


function saveState(){ chrome.storage.local.set({state}); }
function loadState(){ chrome.storage.local.get("state", d => { if (d.state) state=d.state; initUI(); }); }

function initUI(){
  // select trilhas
  const sel=$("#trilha");
  sel.innerHTML = TRILHAS.map(t=>`<option value="${t.id}">${t.nome}</option>`).join("");
  sel.value = state.trilha || "A";
  sel.addEventListener("change", ()=>{ state.trilha = sel.value; renderFields(); saveState(); });

  // delays & modes
  $("#promptDelay").value = state.settings.delay;
  $("#promptDelayMin").value = state.settings.jitterMin;
  $("#promptDelayMax").value = state.settings.jitterMax;
  $("#sendMode").value = state.settings.mode;
  $("#sendStrategy").value = state.settings.strategy || "both";
  $("#waitMode").value = state.settings.waitMode || "timeOnly";
  $("#maxWait").value = state.settings.maxWait || 120;
  $("#retries").value = state.settings.retries ?? 1;

  ["promptDelay","promptDelayMin","promptDelayMax","sendMode","sendStrategy","waitMode","maxWait","retries"].forEach(id=>{
    $("#"+id).addEventListener("input", ()=>{
      state.settings.delay = Number($("#promptDelay").value||0);
      state.settings.jitterMin = Number($("#promptDelayMin").value||0);
      state.settings.jitterMax = Number($("#promptDelayMax").value||0);
      state.settings.mode = $("#sendMode").value;
      state.settings.strategy = $("#sendStrategy").value;
      state.settings.waitMode = $("#waitMode").value;
      state.settings.maxWait = Number($("#maxWait").value||120);
      state.settings.retries = Number($("#retries").value||1);
      saveState();
    });
  });

  // theme
  $("#toggleTheme").addEventListener("click", ()=>{
    const body=document.body; body.dataset.theme = body.dataset.theme==="light" ? "dark":"light";
  });

  // open ChatGPT
  $("#openChatGPT").addEventListener("click", ()=> chrome.tabs.create({url:"https://chat.openai.com/"}));

  // generate queue
  $("#generateQueue").addEventListener("click", ()=>{
    const queue = buildQueue();
    state.generated = queue;
    $("#bulkQueueInput").value = queue;
    updateCount();
    $("#status").textContent = `Gerado ${splitQueue(queue).length} prompts.`;
    $("#miniStatus").textContent = "fila pronta";
    saveState();
  });
  $("#copyGenerated").addEventListener("click", async ()=>{
    const text=$("#bulkQueueInput").value.trim(); if(!text) return;
    await navigator.clipboard.writeText(text); $("#miniStatus").textContent = "copiado";
  });

  // queue actions
  $("#copyButton").addEventListener("click", async ()=>{
    const text=$("#bulkQueueInput").value.trim(); if(!text) return;
    await navigator.clipboard.writeText(text); $("#miniStatus").textContent = "copiado";
  });
  $("#clearButton").addEventListener("click", ()=>{ $("#bulkQueueInput").value=""; updateCount(); $("#miniStatus").textContent="limpo"; });

  $("#btnDedup").addEventListener("click", ()=>{ const arr=splitQueue($("#bulkQueueInput").value); const uniq=[...new Set(arr)]; $("#bulkQueueInput").value=uniq.join("~"); updateCount(); });
  $("#btnShuffle").addEventListener("click", ()=>{ const arr=splitQueue($("#bulkQueueInput").value); for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } $("#bulkQueueInput").value=arr.join("~"); updateCount(); });
  $("#btnSplitTilde").addEventListener("click", ()=>{ const arr=splitQueue($("#bulkQueueInput").value,"tilde"); $("#bulkQueueInput").value=arr.join("\n"); updateCount(); });
  $("#btnSplitLines").addEventListener("click", ()=>{ const arr=splitQueue($("#bulkQueueInput").value,"lines"); $("#bulkQueueInput").value=arr.join("~"); updateCount(); });

  $("#importFile").addEventListener("change", async (e)=>{
    const file=e.target.files[0]; if(!file) return;
    const text = await file.text();
    $("#bulkQueueInput").value = text.trim();
    updateCount();
  });
  $("#exportQueue").addEventListener("click", ()=>{
    const text=$("#bulkQueueInput").value.trim(); const blob=new Blob([text],{type:"text/plain"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="fila_forjaelo.txt"; a.click(); URL.revokeObjectURL(url);
  });

  $("#bulkQueueInput").addEventListener("input", updateCount);

  $("#queueButton").addEventListener("click", ()=>{
    const text=$("#bulkQueueInput").value.trim(); if(!text) return;
    const prompts = splitQueue(text);
    if (state.settings.mode === "manual") {
      navigator.clipboard.writeText(text);
      $("#miniStatus").textContent = "copiado (cole no ChatGPT)";
      return;
    }
    chrome.runtime.sendMessage({ type:"enqueue", prompts, settings: state.settings }, (resp)=>{
      $("#miniStatus").textContent = (resp && resp.ok) ? "enviando..." : "falhou";
    });
  });

  $("#pauseQueue").addEventListener("click", ()=> chrome.runtime.sendMessage({type:"control", action:"pause"}));
  $("#resumeQueue").addEventListener("click", ()=> chrome.runtime.sendMessage({type:"control", action:"resume"}));
  $("#cancelQueue").addEventListener("click", ()=> chrome.runtime.sendMessage({type:"control", action:"cancel"}));

  // presets
  $("#presetDia").addEventListener("click", ()=>applyPreset("dia"));
  $("#presetProjeto").addEventListener("click", ()=>applyPreset("projeto"));
  $("#presetSemana").addEventListener("click", ()=>applyPreset("semana"));
  $("#presetCrise").addEventListener("click", ()=>applyPreset("crise"));

  
  // ---- Aplicar Agora ----
  const cen = $("#cenarioDireto");
  if (cen) {
    const opts = [{id:"ALL", nome:"Tudo (A–N)"}].concat(TRILHAS.map(t=>({id:t.id, nome:t.nome})));
    cen.innerHTML = opts.map(o=>`<option value="${o.id}">${o.nome}</option>`).join("");
    $("#btnGerarDefaults")?.addEventListener("click", ()=>{
      const id = cen.value;
      const queue = (id==="ALL") ? buildAllDefaults() : buildQueueFromDefaults(id);
      $("#bulkQueueInput").value = queue;
      updateCount();
      $("#miniStatus").textContent = "fila pronta (defaults)";
    });
    $("#btnEnfileirarDefaults")?.addEventListener("click", ()=>{
      const text = $("#bulkQueueInput").value.trim();
      if (!text) return;
      const prompts = splitQueue(text);
      if (state.settings.mode === "manual") {
        navigator.clipboard.writeText(text);
        $("#miniStatus").textContent = "copiado (cole no ChatGPT)";
        return;
      }
      chrome.runtime.sendMessage({ type:"enqueue", prompts, settings: state.settings }, (resp)=>{
        $("#miniStatus").textContent = (resp && resp.ok) ? "enviando..." : "falhou";
      });
    });
  }

  // Prefill fila com "Dia Completo" (defaults) na 1ª abertura
  if (!state.generated && !$("#bulkQueueInput").value.trim()) {
    const q = buildQueueFromDefaults("A");
    $("#bulkQueueInput").value = q;
    updateCount();
    $("#miniStatus").textContent = "fila padrão pronta";
  }

  renderFields();
  updateCount();
}

function renderFields(){
  const wrap=$("#trilhaFields");
  const trilha = TRILHAS.find(t=>t.id===state.trilha) || TRILHAS[0];
  wrap.innerHTML = trilha.fields.map(f=>{
    const val=(state.values[trilha.id]?.[f.key])||"";
    return `<label for="${trilha.id}_${f.key}">${f.label}</label>
            <textarea id="${trilha.id}_${f.key}" data-key="${f.key}" rows="3" class="small">${val}</textarea>`;
  }).join("");
  trilha.fields.forEach(f=>{
    const el=document.getElementById(`${trilha.id}_${f.key}`);
    el.addEventListener("input", ()=>{
      state.values[trilha.id]=state.values[trilha.id]||{};
      state.values[trilha.id][f.key]=el.value;
      saveState();
    });
  });
}

function buildQueue(){
  const trilha = TRILHAS.find(t=>t.id===state.trilha) || TRILHAS[0];
  const values = state.values[trilha.id] || {};
  const arr = trilha.build(values);
  return arr.join("~");
}

function splitQueue(text, prefer="auto"){
  let raw = text;
  if (prefer==="tilde") return raw.split("~").map(s=>s.trim()).filter(Boolean);
  if (prefer==="lines") return raw.split(/\r?\n/g).map(s=>s.trim()).filter(Boolean);
  // auto: aceita ~ e/ou linhas
  const hasTilde = raw.includes("~");
  if (hasTilde) return raw.split("~").map(s=>s.trim()).filter(Boolean);
  return raw.split(/\r?\n/g).map(s=>s.trim()).filter(Boolean);
}

function updateCount(){
  const arr = splitQueue($("#bulkQueueInput").value);
  $("#count").textContent = String(arr.length);
  $("#pillCount").textContent = String(arr.length);
}

// ======== Presets (mesmos do pacote anterior) ========
// popup.js — ForjaElo 6.7 · SSA 8.7
// Salva/recupera estado, gera filas com "~" e dispara para content.js

const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

// === Templates das Trilhas (A–N) ===
// Cada trilha tem: id, nome, fields (campos "Base:") e um builder que retorna array de prompts
const TRILHAS = [
  {
    id: "A",
    nome: "A) Dia Completo (abrange todos os elos)",
    fields: [
      {key:"agenda", label:"Agenda do dia + contexto"},
      {key:"prioridades", label:"Prioridades (Topo)"},
      {key:"ruidos", label:"Fontes de distração"},
      {key:"tarefas_criticas", label:"Tarefas críticas (T2)"},
      {key:"preferencias", label:"Preferências/Condições (Box)"},
      {key:"ambiente", label:"Ambiente (Refúgio/ritual)"},
      {key:"escopo", label:"Escopo do principal"},
      {key:"log", label:"Log rápido"},
      {key:"resultados", label:"Resultados do dia"}
    ],
    build: (v) => [
      `SSA, sintetize meu “porquê de hoje” (Chama 5) em 1 frase e liste 3 sinais visíveis de progresso. Base: ‹${v.agenda||""}›.`,
      `SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.prioridades||""}›.`,
      `SSA, defina limites (Central): padrão neutro, avisos de “limitar exposição”, janelas de e-mail/mensagens e no-go list. Base: ‹${v.ruidos||""}›.`,
      `SSA, formate um checklist Potência (5–7 itens) com timers (25/5) para executar o T2; inclua checkpoints, travas e critério de “pronto”. Base: ‹${v.tarefas_criticas||""}›.`,
      `SSA, proponha 1 microtreino Box (≤10 min) para energia mental/física antes do bloco principal; inclua como medir (0–5). Base: ‹${v.preferencias||""}›.`,
      `SSA, crie Elo do Refúgio: ritual de 3–5 min (desligar, respirar, anotar 1 insight) com gatilho e horário. Base: ‹${v.ambiente||""}›.`,
      `SSA, desenhe Sprint10 (10 passos curtos) para fechar o principal do dia até as 20:00, com timers e travas objetivas. Base: ‹${v.escopo||""}›.`,
      `SSA, registre métrica leve do dia: esforço/energia/atrito/progresso (0–5) + 3 aprendizados. Base: ‹${v.log||""}›.`,
      `SSA, faça revisão EOD em 6 bullets (feito/pendente/atrito/aprendizados/agradecer/próximo foco) e gere o Top-3 neutro de amanhã. Base: ‹${v.resultados||""}›.`
    ]
  },
  {
    id: "B",
    nome: "B) Projeto (zero → envio)",
    fields: [
      {key:"briefing", label:"Briefing/Projeto"},
      {key:"escopo", label:"Escopo"},
      {key:"pipeline", label:"Pipeline/Processos"},
      {key:"stakeholders", label:"Stakeholders/decisão"},
      {key:"preferencias", label:"Preferências (Box)"},
      {key:"parcerias", label:"Parcerias/Leads (Ide)"},
      {key:"agenda", label:"Agenda/Pausas"},
      {key:"entrega", label:"Entrega-alvo (D1)"}
    ],
    build: (v) => [
      `SSA, com base no texto abaixo, crie: (1) objetivo em 1 frase; (2) 3 passos mínimos; (3) travas + Sprint10. Texto: ‹${v.briefing||""}›.`,
      `SSA, descreva o resultado esperado (T2 Resultado) em 1 frase e 3 critérios de excelência (Talentos). Base: ‹${v.escopo||""}›.`,
      `SSA, mapeie processos (Potência): checklist curto (5–7) com timers e checkpoints; inclua “pronto/feito”. Base: ‹${v.pipeline||""}›.`,
      `SSA, defina limites (Central) específicos do projeto: canais, horários, pontos de decisão; inclua aviso padrão de “limitar exposição”. Base: ‹${v.stakeholders||""}›.`,
      `SSA, proponha microtreino Box (≤10 min) para iniciar os blocos e reduzir atrito. Base: ‹${v.preferencias||""}›.`,
      `SSA, gere 2 roteiros Ide sem dados sensíveis: (a) convite frio de 3 linhas; (b) follow-up curto com CTA. Base: ‹${v.parcerias||""}›.`,
      `SSA, crie Elo do Refúgio para pausas estratégicas (3–5 min, passos claros). Base: ‹${v.agenda||""}›.`,
      `SSA, desenhe Sprint10 para o primeiro envio (D1) com estimativas rápidas, travas e “corte seguro”. Base: ‹${v.entrega||""}›.`
    ]
  },
  {
    id: "C",
    nome: "C) Semana Completa",
    fields: [
      {key:"metas", label:"Metas/resultados-chave"},
      {key:"calendario", label:"Calendário da semana"},
      {key:"rotina", label:"Rotina/Contexto profundo"},
      {key:"tipo_trabalho", label:"Tipo de trabalho (QA/empacote)"},
      {key:"preferencias", label:"Preferências Box"},
      {key:"leads", label:"Leads/Lista (Ide)"},
      {key:"energia", label:"Energia/Descanso"},
      {key:"backlog", label:"Backlog"},
      {key:"registros", label:"Registros para retro"}
    ],
    build: (v) => [
      `SSA, consolide meu Propósito da semana (Chama) em 1 frase e 3 resultados-chave observáveis. Base: ‹${v.metas||""}›.`,
      `SSA, gere um Roadmap Potência (processos + timers) para 5 dias: blocos focais/delivery/revisão. Base: ‹${v.calendario||""}›.`,
      `SSA, estabeleça padrões Central: janelas de comunicação, regras de contexto profundo, e checklist “entrar/sair de foco”. Base: ‹${v.rotina||""}›.`,
      `SSA, defina critérios Talentos (excelência/QA) e template de empacotamento de entregas. Base: ‹${v.tipo_trabalho||""}›.`,
      `SSA, agende microtreinos Box (≤10 min) distribuídos na semana (força, mobilidade, respiração). Base: ‹${v.preferencias||""}›.`,
      `SSA, crie 3 roteiros Ide (contato inicial, nurture curto, fechamento com CTA) sem dados sensíveis. Base: ‹${v.leads||""}›.`,
      `SSA, janelas Refúgio (descanso/detox): horários, rituais e limites práticos. Base: ‹${v.energia||""}›.`,
      `SSA, Sprint10 semanal: 10 passos de execução com checkpoints por dia. Base: ‹${v.backlog||""}›.`,
      `SSA, retro semanal em 8 bullets (ganhos, perdas, atritos, riscos, oportunidades, aprendizados, descarte, foco seguinte). Base: ‹${v.registros||""}›.`
    ]
  },
  {
    id: "D",
    nome: "D) Funil de Parcerias (Ide + Resultado)",
    fields: [
      {key:"produto", label:"Produto/serviço (proposta de valor)"},
      {key:"perfil", label:"Perfil do contato"},
      {key:"meta_contatos", label:"Meta de contatos"},
      {key:"etica", label:"Ética/limites"}
    ],
    build: (v) => [
      `SSA, extraia proposta de valor em 1 frase e 3 provas de credibilidade. Base: ‹${v.produto||""}›.`,
      `SSA, crie 3 roteiros Ide sem dados sensíveis: DM curta, e-mail de 4 linhas e mensagem de follow-up (72h) — cada um com CTA. Base: ‹${v.perfil||""}›.`,
      `SSA, monte checklist Potência (5–7) com timers para disparo, registro, qualificação e revisão diária do funil (T2 Resultado). Base: ‹${v.meta_contatos||""}›.`,
      `SSA, defina travas Central: limites por dia, horário de outreach e regras de não-insistência. Base: ‹${v.etica||""}›.`,
      `SSA, Sprint10 para “primeiros 10 contatos” com checkpoints objetivos e “stop-loss” de tempo. Base: ‹${v.meta_contatos||""}›.`
    ]
  },
  {
    id: "E",
    nome: "E) Qualidade & Excelência (Talentos)",
    fields: [
      {key:"entrega", label:"Entrega"},
      {key:"workflow", label:"Workflow/QA"},
      {key:"prazos", label:"Prazos"}
    ],
    build: (v) => [
      `SSA, descreva “o que é excelente” em 1 frase e defina 3 critérios mensuráveis de QA. Base: ‹${v.entrega||""}›.`,
      `SSA, gere checklist Potência de QA (5–7) com timers por etapa (rascunho → revisão → empacote → envio). Base: ‹${v.workflow||""}›.`,
      `SSA, inclua travas para não-perfeccionismo (Central): limite de revisões e gatilho de envio. Base: ‹${v.prazos||""}›.`,
      `SSA, Sprint10 de empacotamento (10 passos curtos) para fechar hoje. Base: ‹${v.entrega||""}›.`
    ]
  },
  {
    id: "F",
    nome: "F) Foco Profundo (proteção + execução)",
    fields: [
      {key:"tarefa", label:"Tarefa / Bloco principal"},
      {key:"setup", label:"Setup de foco (ambiente/notifs)"},
      {key:"subtarefas", label:"Subtarefas"},
      {key:"preferencias", label:"Preferências Box"},
      {key:"observacoes", label:"Observações"}
    ],
    build: (v) => [
      `SSA, resuma o propósito do bloco em 1 frase e derive 3 micro-metas não negociáveis. Base: ‹${v.tarefa||""}›.`,
      `SSA, defina protocolo Central “entrar em foco”: ambiente, notificações, lista de corte e tempo total. Base: ‹${v.setup||""}›.`,
      `SSA, checklist Potência com timers (25/5) para as 3 micro-metas e checkpoint de meio do bloco. Base: ‹${v.subtarefas||""}›.`,
      `SSA, microtreino Box de 5–8 min (respiração + mobilidade) para antes/depois. Base: ‹${v.preferencias||""}›.`,
      `SSA, mini-retro (EOB): feito, atrito, uma melhoria. Base: ‹${v.observacoes||""}›.`
    ]
  },
  {
    id: "G",
    nome: "G) Energia & Antifragilidade (Box + Refúgio)",
    fields: [
      {key:"condicao", label:"Condição do dia (0–5)"},
      {key:"ambiente", label:"Ambiente (gatilhos)"},
      {key:"rotina", label:"Rotina (retorno ao foco)"},
      {key:"top3", label:"Top‑3 do dia"}
    ],
    build: (v) => [
      `SSA, avalie energia (0–5) e proponha 2 microtreinos Box (≤10 min): um de ativação e um de recuperação. Base: ‹${v.condicao||""}›.`,
      `SSA, crie Elo do Refúgio (3–5 min) com passos claros e gatilho contextual. Base: ‹${v.ambiente||""}›.`,
      `SSA, defina “zona segura” Central para pausas: duração, frequência e regras de retorno ao foco. Base: ‹${v.rotina||""}›.`,
      `SSA, checklist Potência para integrar treino/pausas sem quebrar o T2 do dia. Base: ‹${v.top3||""}›.`
    ]
  },
  {
    id: "H",
    nome: "H) Limites & Comunhão (Central)",
    fields: [
      {key:"ruidos", label:"Fontes de ruído/distração"},
      {key:"relacoes", label:"Relacionamentos/Times"},
      {key:"governanca", label:"Governança/Decisão"}
    ],
    build: (v) => [
      `SSA, mapeie ruídos e distrações e formule 5 avisos prontos de “limitar exposição” para diferentes contextos (reunião, chat, e-mail, família, social). Base: ‹${v.ruidos||""}›.`,
      `SSA, desenhe um protocolo de “contexto neutro”: como pedir/ativar e quando encerrar. Base: ‹${v.relacoes||""}›.`,
      `SSA, defina janelas de comunicação e escadas de decisão (quem decide o quê e quando). Base: ‹${v.governanca||""}›.`
    ]
  },
  {
    id: "I",
    nome: "I) Finanças & Resultado (Talentos)",
    fields: [
      {key:"negocio", label:"Negócio (modelo simples)"},
      {key:"planilha", label:"Planilha simples (descrição)"},
      {key:"regras", label:"Regras/limites"}
    ],
    build: (v) => [
      `SSA, derive 3 indicadores simples de resultado (receita, margem, tickets/semana) e metas de curto prazo. Base: ‹${v.negocio||""}›.`,
      `SSA, crie checklist Potência (5–7) para registro financeiro básico diário (entradas/saídas/observações). Base: ‹${v.planilha||""}›.`,
      `SSA, defina travas Central: tetos de gasto, aprovações e janela de revisão semanal. Base: ‹${v.regras||""}›.`
    ]
  },
  {
    id: "J",
    nome: "J) Crise/Incêndio (corte seguro)",
    fields: [
      {key:"situacao", label:"Situação/Problema"},
      {key:"agenda", label:"Agenda a pausar"},
      {key:"recursos", label:"Recursos disponíveis"},
      {key:"stakeholders", label:"Stakeholders"},
      {key:"aprendizados", label:"Aprendizados"}
    ],
    build: (v) => [
      `SSA, sintetize o problema em 1 frase e 3 consequências se nada for feito. Base: ‹${v.situacao||""}›.`,
      `SSA, gere um “corte seguro” (Central): o que pausar/adiar e por quanto tempo. Base: ‹${v.agenda||""}›.`,
      `SSA, Sprint10 emergencial: 10 passos curtos para estabilizar em 90–120 min, com timers e pontos de não-retorno. Base: ‹${v.recursos||""}›.`,
      `SSA, plano de comunicação (Ide) em 3 bullets para partes interessadas (sem dados sensíveis). Base: ‹${v.stakeholders||""}›.`,
      `SSA, lições rápidas (3 bullets) e critério para encerrar o modo crise. Base: ‹${v.aprendizados||""}›.`
    ]
  },
  {
    id: "K",
    nome: "K) Revisão Diária & Arquivação",
    fields: [
      {key:"log", label:"Log do dia"},
      {key:"prioridades", label:"Prioridades (amanhã)"},
      {key:"preferencias", label:"Preferências de template (registros)"}
    ],
    build: (v) => [
      `SSA, faça uma revisão em 6 bullets: feito/pendente/atrito/aprendizados/agradecer/próximo foco. Base: ‹${v.log||""}›.`,
      `SSA, gere meu Top-3 neutro de amanhã: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.prioridades||""}›.`,
      `SSA, crie um template de “Registros” (anotações fáceis) com campos: data, foco, decisões, riscos, métrica 0–5 e anexos. Base: ‹${v.preferencias||""}›.`
    ]
  },
  {
    id: "L",
    nome: "L) Biblioteca de Mensagens (Ide)",
    fields: [
      {key:"perfil", label:"Perfil do contato"},
      {key:"funil", label:"Funil/processo"}
    ],
    build: (v) => [
      `SSA, gere 4 roteiros Ide sem dados sensíveis: (1) pedido de contexto, (2) convite para chamada de 15 min, (3) agradecimento + próximo passo, (4) follow-up curto pós-reunião; todos com 1 CTA claro. Base: ‹${v.perfil||""}›.`,
      `SSA, checklist Potência para enviar e registrar respostas em até 30 min/dia, com timers e limites (Central). Base: ‹${v.funi||v.funil||""}›.`
    ]
  },
  {
    id: "M",
    nome: "M) Aprendizado Contínuo",
    fields: [
      {key:"tema", label:"Tema de estudo"},
      {key:"hipoteses", label:"Hipóteses/Experimentos"},
      {key:"calendario", label:"Calendário/Proteção de blocos"}
    ],
    build: (v) => [
      `SSA, crie um “Diário de Aprendizado” com campos: insight, onde usei, próximo experimento, escore 0–5. Base: ‹${v.tema||""}›.`,
      `SSA, Sprint10 de experimentos (10 micro-testes) com estimativas rápidas e critério de descarte. Base: ‹${v.hipoteses||""}›.`,
      `SSA, protocolo Central para encerrar experimentos e proteger blocos de entrega. Base: ‹${v.calendario||""}›.`
    ]
  },
  {
    id: "N",
    nome: "N) Top‑3 Neutro (rápido)",
    fields: [
      {key:"agenda", label:"Agenda + prioridades"},
      {key:"tarefas", label:"Tarefas (T2)"},
      {key:"rotina", label:"Rotina/energia"}
    ],
    build: (v) => [
      `SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹${v.agenda||""}›.`,
      `SSA, formate checklist Potência para o T2 com timers (25/5) e Sprint10 final de revisão. Base: ‹${v.tarefas||""}›.`,
      `SSA, defina uma janela Refúgio (15–20 min) e 1 microtreino Box (≤10 min) para sustentar energia. Base: ‹${v.rotina||""}›.`
    ]
  }
];

// ===== UI =====
let state = {
  trilha: "A",
  values: {},
  settings: { delay:0, jitterMin:0, jitterMax:0, mode:"auto" },
  generated: ""
};

function saveState() {
  chrome.storage.local.set({ state });
}
function loadState() {
  chrome.storage.local.get("state", (data) => {
    if (data.state) state = data.state;
    initUI();
  });
}

function initUI() {
  // popular select de trilhas
  const sel = $("#trilha");
  sel.innerHTML = TRILHAS.map(t => `<option value="${t.id}">${t.nome}</option>`).join("");
  sel.value = state.trilha || "A";
  sel.addEventListener("change", () => {
    state.trilha = sel.value;
    
// init
document.addEventListener("DOMContentLoaded", loadState);
