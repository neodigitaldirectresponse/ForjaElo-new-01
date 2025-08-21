// prompts.js — inclui apenas os prompts da ForjaElo

// Prompts da ForjaElo
const FORJA_PROMPTS = [
  {
    title: "ForjaElo · SSA (Organizador)",
    text: `Você é o Servo sem alma (SSA). Apenas organiza, verifica e padroniza meu material.
Não proponha objetivos, visão ou conteúdo novo sem minha direção explícita.
Peça insumos se faltarem dados. Priorize privacidade e listas curtas.
Formato-padrão:
1) Objetivo (1 frase)
2) 3 passos mínimos
3) Travas + Sprint10
Material: <<<COLAR AQUI>>>`
  },
  {
    title: "ForjaElo · Scorecard (CSV)",
    text: `Gere CSV com cabeçalhos e validações simples para o scorecard semanal.
Campos: Data,EloDoDia,Top1_Proposito,Top2_Resultado,Top3_Elo,Leveza_1a5,EntregasElo,Devocional_Aplicacao,Convites,Fechamentos,DispersaoMin,Observacoes
Produza apenas o CSV, sem comentários.`
  },
  {
    title: "ForjaElo · Devocional 15min",
    text: `Monte um esboço de 15 min: 3 pontos (bíblico→prático→apelo), 2 versos, 1 desafio 24h.
Use SOMENTE meu rascunho:
<<<COLAR RASCUNHO>>>`
  },
  {
    title: "ForjaElo · Processo em 7 passos",
    text: `Liste 7 passos (1 linha cada), com tempo estimado e checagem. Baseie-se apenas no texto:
<<<COLAR BASE>>>`
  },
  {
    title: "ForjaElo · Roteiro Ide (90s)",
    text: `Escreva um convite/evangelismo de 90s. Use APENAS meu material.
<<<COLAR PONTOS>>>`
  },
  {
    title: "ForjaElo · Detox 24h",
    text: `Transforme esta lista de 'drenos' em protocolo de desintoxicação 24h (digital, emocional, espiritual) em 5 passos.
<<<COLAR LISTA>>>`
  },
  {
    title: "A) Dia Completo (abrange todos os elos)",
    text: `SSA, sintetize meu “porquê de hoje” (Chama 5) em 1 frase e liste 3 sinais visíveis de progresso. Base: ‹agenda do dia + contexto›.~SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹prioridades›.~SSA, defina limites (Central): padrão neutro, avisos de “limitar exposição”, janelas de e-mail/mensagens e no-go list. Base: ‹fontes de distração›.~SSA, formate um checklist Potência (5–7 itens) com timers (25/5) para executar o T2; inclua checkpoints, travas e critério de “pronto”. Base: ‹tarefas críticas›.~SSA, proponha 1 microtreino Box (≤10 min) para energia mental/física antes do bloco principal; inclua como medir (0–5). Base: ‹preferências/condições›.~SSA, crie Elo do Refúgio: ritual de 3–5 min (desligar, respirar, anotar 1 insight) com gatilho e horário. Base: ‹ambiente›.~SSA, desenhe Sprint10 (10 passos curtos) para fechar o principal do dia até as 20:00, com timers e travas objetivas. Base: ‹escopo›.~SSA, registre métrica leve do dia: esforço/energia/atrito/progresso (0–5) + 3 aprendizados. Base: ‹log rápido›.~SSA, faça revisão EOD em 6 bullets (feito/pendente/atrito/aprendizados/agradecer/próximo foco) e gere o Top-3 neutro de amanhã. Base: ‹resultados›.`
  },
  {
    title: "B) Projeto • do zero ao envio (kickoff → envio 1)",
    text: `SSA, com base no texto abaixo, crie: (1) objetivo em 1 frase; (2) 3 passos mínimos; (3) travas + Sprint10. Texto: ‹briefing/projeto›.~SSA, descreva o resultado esperado (T2 Resultado) em 1 frase e 3 critérios de excelência (Talentos). Base: ‹escopo›.~SSA, mapeie processos (Potência): checklist curto (5–7) com timers e checkpoints; inclua “pronto/feito”. Base: ‹pipeline›.~SSA, defina limites (Central) específicos do projeto: canais, horários, pontos de decisão; inclua aviso padrão de “limitar exposição”. Base: ‹stakeholders›.~SSA, proponha microtreino Box (≤10 min) para iniciar os blocos e reduzir atrito. Base: ‹preferências›.~SSA, gere 2 roteiros Ide sem dados sensíveis: (a) convite frio de 3 linhas; (b) follow-up curto com CTA. Base: ‹parcerias›.~SSA, crie Elo do Refúgio para pausas estratégicas (3–5 min, passos claros). Base: ‹agenda›.~SSA, desenhe Sprint10 para o primeiro envio (D1) com estimativas rápidas, travas e “corte seguro”. Base: ‹entrega-alvo›.`
  },
  {
    title: "C) Semana Completa (planejamento → retrospectiva)",
    text: `SSA, consolide meu Propósito da semana (Chama) em 1 frase e 3 resultados-chave observáveis. Base: ‹metas›.~SSA, gere um Roadmap Potência (processos + timers) para 5 dias: blocos focais/delivery/revisão. Base: ‹calendário›.~SSA, estabeleça padrões Central: janelas de comunicação, regras de contexto profundo, e checklist “entrar/sair de foco”. Base: ‹rotina›.~SSA, defina critérios Talentos (excelência/QA) e template de empacotamento de entregas. Base: ‹tipo de trabalho›.~SSA, agende microtreinos Box (≤10 min) distribuídos na semana (força, mobilidade, respiração). Base: ‹preferências›.~SSA, crie 3 roteiros Ide (contato inicial, nurture curto, fechamento com CTA) sem dados sensíveis. Base: ‹lista de leads›.~SSA, janelas Refúgio (descanso/detox): horários, rituais e limites práticos. Base: ‹energia›.~SSA, Sprint10 semanal: 10 passos de execução com checkpoints por dia. Base: ‹backlog›.~SSA, retro semanal em 8 bullets (ganhos, perdas, atritos, riscos, oportunidades, aprendizados, descarte, foco seguinte). Base: ‹registros›.`
  },
  {
    title: "D) Funil de Parcerias (Ide + Resultado)",
    text: `SSA, extraia proposta de valor em 1 frase e 3 provas de credibilidade. Base: ‹produto/serviço›.~SSA, crie 3 roteiros Ide sem dados sensíveis: DM curta, e-mail de 4 linhas e mensagem de follow-up (72h) — cada um com CTA. Base: ‹perfil do contato›.~SSA, monte checklist Potência (5–7) com timers para disparo, registro, qualificação e revisão diária do funil (T2 Resultado). Base: ‹meta de contatos›.~SSA, defina travas Central: limites por dia, horário de outreach e regras de não-insistência. Base: ‹ética/limites›.~SSA, Sprint10 para “primeiros 10 contatos” com checkpoints objetivos e “stop-loss” de tempo. Base: ‹janela disponível›.`
  },
  {
    title: "E) Qualidade & Excelência (Talentos)",
    text: `SSA, descreva “o que é excelente” em 1 frase e defina 3 critérios mensuráveis de QA. Base: ‹entrega›.~SSA, gere checklist Potência de QA (5–7) com timers por etapa (rascunho → revisão → empacote → envio). Base: ‹workflow›.~SSA, inclua travas para não-perfeccionismo (Central): limite de revisões e gatilho de envio. Base: ‹prazos›.~SSA, Sprint10 de empacotamento (10 passos curtos) para fechar hoje. Base: ‹escopo›.`
  },
  {
    title: "F) Foco Profundo (proteção + execução)",
    text: `SSA, resuma o propósito do bloco em 1 frase e derive 3 micro-metas não negociáveis. Base: ‹tarefa›.~SSA, defina protocolo Central “entrar em foco”: ambiente, notificações, lista de corte e tempo total. Base: ‹setup›.~SSA, checklist Potência com timers (25/5) para as 3 micro-metas e checkpoint de meio do bloco. Base: ‹subtarefas›.~SSA, microtreino Box de 5–8 min (respiração + mobilidade) para antes/depois. Base: ‹preferências›.~SSA, mini-retro (EOB): feito, atrito, uma melhoria. Base: ‹observações›.`
  },
  {
    title: "G) Energia & Antifragilidade (Box + Refúgio)",
    text: `SSA, avalie energia (0–5) e proponha 2 microtreinos Box (≤10 min): um de ativação e um de recuperação. Base: ‹condição do dia›.~SSA, crie Elo do Refúgio (3–5 min) com passos claros e gatilho contextual. Base: ‹ambiente›.~SSA, defina “zona segura” Central para pausas: duração, frequência e regras de retorno ao foco. Base: ‹rotina›.~SSA, checklist Potência para integrar treino/pausas sem quebrar o T2 do dia. Base: ‹Top-3›.`
  },
  {
    title: "H) Limites & Comunhão (Central)",
    text: `SSA, mapeie ruídos e distrações e formule 5 avisos prontos de “limitar exposição” para diferentes contextos (reunião, chat, e-mail, família, social). Base: ‹fontes de ruído›.~SSA, desenhe um protocolo de “contexto neutro”: como pedir/ativar e quando encerrar. Base: ‹relacionamentos›.~SSA, defina janelas de comunicação e escadas de decisão (quem decide o quê e quando). Base: ‹time/projeto›.`
  },
  {
    title: "I) Finanças & Resultado (Talentos)",
    text: `SSA, derive 3 indicadores simples de resultado (receita, margem, tickets/semana) e metas de curto prazo. Base: ‹negócio›.~SSA, crie checklist Potência (5–7) para registro financeiro básico diário (entradas/saídas/observações). Base: ‹planilha simples›.~SSA, defina travas Central: tetos de gasto, aprovações e janela de revisão semanal. Base: ‹regras›.`
  },
  {
    title: "J) Crise/Incêndio (modo “corte seguro”)",
    text: `SSA, sintetize o problema em 1 frase e 3 consequências se nada for feito. Base: ‹situação›.~SSA, gere um “corte seguro” (Central): o que pausar/adiar e por quanto tempo. Base: ‹agenda›.~SSA, Sprint10 emergencial: 10 passos curtos para estabilizar em 90–120 min, com timers e pontos de não-retorno. Base: ‹recursos›.~SSA, plano de comunicação (Ide) em 3 bullets para partes interessadas (sem dados sensíveis). Base: ‹stakeholders›.~SSA, lições rápidas (3 bullets) e critério para encerrar o modo crise. Base: ‹aprendizados›.`
  },
  {
    title: "K) Revisão Diária & Arquivação",
    text: `SSA, faça uma revisão em 6 bullets: feito/pendente/atrito/aprendizados/agradecer/próximo foco. Base: ‹log do dia›.~SSA, gere meu Top-3 neutro de amanhã: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹prioridades›.~SSA, crie um template de “Registros” com campos: data, foco, decisões, riscos, métrica 0–5 e anexos. Base: ‹preferências›.`
  },
  {
    title: "L) Biblioteca de Mensagens (Ide) — uso responsável",
    text: `SSA, gere 4 roteiros Ide sem dados sensíveis: (1) pedido de contexto, (2) convite para chamada de 15 min, (3) agradecimento + próximo passo, (4) follow-up curto pós-reunião; todos com 1 CTA claro. Base: ‹perfil do contato›.~SSA, checklist Potência para enviar e registrar respostas em até 30 min/dia, com timers e limites (Central). Base: ‹funil›.`
  },
  {
    title: "M) Aprendizado Contínuo (log leve)",
    text: `SSA, crie um “Diário de Aprendizado” com campos: insight, onde usei, próximo experimento, escore 0–5. Base: ‹tema›.~SSA, Sprint10 de experimentos (10 micro-testes) com estimativas rápidas e critério de descarte. Base: ‹hipóteses›.~SSA, protocolo Central para encerrar experimentos e proteger blocos de entrega. Base: ‹calendário›.`
  },
  {
    title: "N) Top-3 Neutro (rápido, para o dia)",
    text: `SSA, gere meu Top-3 neutro: T1 Propósito (Chama), T2 Resultado (Talentos/Potência), T3 Elo do dia (calendário). Base: ‹agenda + prioridades›.~SSA, formate checklist Potência para o T2 com timers (25/5) e Sprint10 final de revisão. Base: ‹tarefas›.~SSA, defina uma janela Refúgio (15–20 min) e 1 microtreino Box (≤10 min) para sustentar energia. Base: ‹rotina›.`
  }
];

// Estrutura os prompts por grupos para facilitar o uso no popup
window.PROMPT_GROUPS = [
  { label: 'ForjaElo', items: FORJA_PROMPTS }
];


