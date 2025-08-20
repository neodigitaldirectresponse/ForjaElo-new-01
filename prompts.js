// prompts.js — inclui prompts padrão e o pacote ForjaElo

const BASE_PROMPTS = [
  {
    title: "Realizar pesquisa de empresas de IA",
    text: `Utilizando sua capacidade de busca na web, procure as informações mais recentes sobre empresas de capital aberto que estejam se beneficiando do crescimento da IA. Inclua colunas de URL onde eu possa saber mais sobre cada empresa, suas vantagens competitivas e eventuais avaliações de analistas. Retorne tudo em uma tabela inline. Pesquisaremos em lotes de 10; quando eu disser "Mais", encontre mais 10. Mantenha as informações resumidas e todas dentro da tabela. Exemplo: | Nome da Empresa | Símbolo | Vantagens Competitivas | Avaliação de Analistas | URL | ... Por favor, forneça as informações mais recentes disponíveis. ~Mais~ Mais ~ Mais`
  },
  {
    title: "Como ganhar um milhão de dólares com suas habilidades",
    text: `[Skill Set] = Uma breve descrição de suas principais habilidades e especialidades [Time Frame] = O período desejado para atingir um milhão de dólares [Available Resources] = Recursos atualmente disponíveis [Interests] = Interesses pessoais que podem ser aproveitados ~ Passo 1: Com base nas seguintes habilidades: {Skill Set}, identifique as três habilidades com maior demanda no mercado e que podem ser monetizadas de forma eficaz. ~ Passo 2: Para cada uma das três habilidades identificadas, liste estratégias de monetização que possam gerar renda significativa dentro de {Time Frame}. Use listas numeradas para clareza. ~ Passo 3: Diante dos recursos disponíveis: {Available Resources}, determine como eles podem ser utilizados para apoiar as estratégias listadas. Forneça exemplos específicos. ~ Passo 4: Considere seus interesses pessoais: {Interests}. Sugira formas de integrar esses interesses às estratégias de monetização para aumentar a motivação e a sustentabilidade. ~ Passo 5: Crie um plano de ação passo a passo delineando as tarefas principais necessárias para implementar as estratégias escolhidas. Organize o plano em uma linha do tempo para alcançar o objetivo dentro de {Time Frame}. ~ Passo 6: Identifique possíveis desafios e obstáculos que possam surgir durante a execução do plano. Dê sugestões de como superá-los. ~ Passo 7: Revise o plano de ação e ajuste-o para garantir que seja realista, alcançável e alinhado às suas habilidades e recursos. Faça ajustes quando necessário.`
  },
  {
    title: "Gerar afirmações positivas",
    text: `{USER_NAME}=Nome do usuário\n{USER_TRAITS}=Lista de traços ou qualidades positivas do usuário\n{USER_GOALS}=Principais objetivos ou aspirações do usuário\n\nCom base nas informações do usuário, resuma os principais traços e objetivos.\nDiante dos seguintes detalhes sobre [USER_NAME]—traços positivos: [USER_TRAITS]; objetivos principais: [USER_GOALS]—crie um breve resumo que servirá de contexto para gerar afirmações\n\n ~ Crie afirmações focadas em aumentar a autoconfiança, a motivação e o senso de valor pessoal com base nas qualidades e metas do usuário.\n"Usando esse contexto: [SUMMARY_FROM_STEP_1], gere [AFFIRMATION_COUNT] afirmações que incentivem a crença em si mesmo e ações positivas. Garanta que cada afirmação reflita um dos traços ou objetivos do usuário e seja direta e motivadora."\n\n~ Melhore cada afirmação adicionando linguagem emocionalmente forte para torná-la impactante e fácil de internalizar.\n"Para cada afirmação em [AFFIRMATIONS_FROM_STEP_2], aperfeiçoe-a com palavras encorajadoras e deixe-a concisa. Certifique-se de que esteja no tempo presente, de modo que o usuário se sinta estimulado no momento."\n\n~Revise e ajuste as afirmações para garantir que sejam motivadoras e alinhadas à jornada pessoal de [USER_NAME].\n"Revise a lista de afirmações e faça quaisquer ajustes finais para garantir que soem naturais, positivas e diretamente relacionadas ao crescimento e às metas pessoais de [USER_NAME].`
  }
];

// Pacote de prompts da ForjaElo
window.FORJA_PROMPTS = [
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
  }
];

// Combina prompts existentes com os da ForjaElo
const prompts = [...BASE_PROMPTS, ...window.FORJA_PROMPTS];

