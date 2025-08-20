# Extensão do Chrome Agente Autônomo

Agente Autônomo é uma extensão de navegador que automatiza fluxos de trabalho de agentes de IA em plataformas populares como o ChatGPT e o Claude. Ela injeta scripts nos domínios suportados e executa um service worker em segundo plano para gerenciar as solicitações à API do Agente Autônomo.

## Versão Local

Este repositório agora inclui uma versão mínima offline da extensão. A compilação local remove qualquer comunicação com APIs e coloca toda a lógica diretamente em `popup.html`. Os scripts de background e de conteúdo ficam desabilitados em `manifest.json`, permitindo que a extensão funcione somente a partir do popup, sem acesso à rede.

## Funcionalidades

- Popup offline para anotações usando o armazenamento local do Chrome.
- Nenhum service worker em segundo plano ou scripts de conteúdo.
- Funciona totalmente a partir do popup, sem acesso à rede.
- Exporte respostas do ChatGPT como um arquivo JSON pelo popup.
- Os resultados da automação são salvos automaticamente em segundo plano e exibidos quando o popup é aberto.
- Redefina o resultado armazenado do chat atual com o novo **Resetar Chat**.
- O popup mostra continuamente o status do serviço em segundo plano e do script de conteúdo.
- Escolha a ferramenta ativa do ChatGPT (Criar imagem, Busca na Web, etc.) diretamente no popup.
- Pressione "/" para focar rapidamente o menu de ferramentas, escolha a opção com as setas e ela será aplicada automaticamente.
- Defina alvos de clique personalizados na página usando a seção **Cliques Personalizados**.
- Personalize atalhos de teclado diretamente no popup e restaure-os com **Restaurar Padrões**.
- O atalho **Aplicar e Automatizar** cola o texto da área de transferência, inicia a automação e copia o resultado automaticamente.

## Instalação

1. Clone ou baixe este repositório.
2. No Chrome, abra `chrome://extensions` e ative o **Modo desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione esta pasta.
4. O ícone "Agente Autônomo" aparecerá na barra de extensões.

## Uso

Use o ícone da barra de ferramentas para abrir o popup. Toda a funcionalidade está contida no próprio popup e seus dados são armazenados localmente usando `chrome.storage`.

### Redirecionamento para ChatGPT

Caso queira acessar rapidamente o ChatGPT, abra o arquivo `redirect.html` incluído neste repositório. Ele redireciona automaticamente para `https://chatgpt.com/` sem exibir mensagens adicionais.

## Recursos Avançados

### Mensagens em Fila

O popup permite enviar múltiplos prompts em sequência. Insira os prompts separados por `~` no campo **Fila em Lote** e clique em **Enfileirar**. As mensagens são armazenadas localmente e processadas uma a uma. Abra **Mensagens enfileiradas** no popup para revisar ou remover itens. Qualquer texto colado ou digitado que contenha `~` também será dividido automaticamente antes do envio, inclusive ao usar o atalho de aplicar ferramenta.

### Atraso entre Prompts

Cada mensagem em fila espera um atraso configurável antes de ser enviada. Use **Configurações de Atraso** para definir o atraso mínimo e máximo em segundos. Os valores escolhidos permanecem no armazenamento local entre as sessões.

### Prompts Personalizados

Os modelos de prompt padrão vêm de `prompts.js`. Edite esse arquivo para adicionar ou modificar os prompts exibidos no menu. Recarregue a extensão após as alterações para ver suas entradas personalizadas.

### Exportar Logs

Para solucionar problemas, a extensão grava logs do console do script de conteúdo. Cada entrada indica o **nível** (info ou error) para facilitar a análise. Clique em **Exportar Logs** no popup para baixar um arquivo JSON com as entradas recentes.

### Notificações e feedback

Erros importantes agora disparam notificações do Chrome. Se um clique personalizado falhar, a extensão exibe um alerta rápido para orientar o usuário. Essas mensagens também são gravadas no log para facilitar o diagnóstico.
Após o envio da última mensagem, aparece o aviso "Carregando resposta..." no canto inferior direito até que a geração termine. Quando a automação termina, um aviso "Automação concluída" aparece brevemente no canto inferior direito da página.

### Cliques Personalizados

Use **Cliques Personalizados** no popup para escolher elementos na página que devem ser clicados automaticamente. Pressione *Selecionar Elementos* e escolha os alvos. Os seletores escolhidos ficam armazenados localmente e podem ser executados depois com *Executar Cliques*.

### Atalhos Personalizados

Na seção **Atalhos de Teclado**, clique em um campo e pressione a combinação desejada. Use Backspace para remover e o botão **Restaurar Padrões** para voltar às configurações originais.

### Controle Total pelo Teclado

Todos os botões do popup possuem atalhos configuráveis e a extensão também define comandos globais acessíveis em `chrome://extensions/shortcuts`.
Por padrão eles são:

- **Abrir ChatGPT rapidamente**: `Ctrl+Shift+1`
- **Aplicar e Automatizar**: `Ctrl+Shift+2`
- **Colar texto e iniciar automação**: `Ctrl+Shift+3`
- **Copiar JSON do resultado**: `Ctrl+Shift+4`

Devido ao limite de quatro atalhos imposto pelo Chrome, apenas esses comandos são incluídos no manifesto por padrão.

Com esses comandos é possível iniciar a extensão e realizar toda a automação sem recorrer ao mouse. Ajuste-os conforme sua preferência.
O atalho de demonstração digita mais de 30 caracteres errados e então corrige tudo usando diversas formas de seleção e exclusão.

## Desenvolvimento

Este repositório agora contém apenas a build offline mínima. Toda a lógica reside em `background.js`, `content.js`, `popup.js` e `prompts.js`. Os scripts agrupados e os artefatos de build anteriores foram removidos para simplificar o projeto.

## Estrutura do Projeto

Abaixo está uma visão geral dos arquivos incluídos neste repositório. A extensão é composta principalmente pelos seguintes arquivos localizados na raiz do projeto.

```
. ├── README.md
│   Este arquivo.
├── background.js
│   Service worker offline.
├── content.js
│   Script de conteúdo injetado nos sites suportados.
├── icon-128.png
│   Ícone da extensão usado na Chrome Web Store.
├── icon-34.png
│   Ícone da barra de ferramentas.
├── manifest.json
│   Manifesto da extensão descrevendo permissões e pontos de entrada.
├── popup.html
│   Modelo HTML para o popup.
├── popup.js
│   Lógica da interface do popup.
├── prompts.js
│   Definições de prompts padrão usadas pelo popup.
└── test/
    Scripts de teste utilizados durante o desenvolvimento.
```

## Atalhos do ChatGPT (versão web)

Estes atalhos já estão integrados ao ChatGPT. Consulte a lista antes de definir combinações personalizadas na extensão para evitar conflitos. As teclas mostradas valem para Windows, Linux e macOS (ajustando `Ctrl` por `⌘` quando necessário).

| Ação                              | Windows / Linux          | macOS              | Descrição                                                         |
| --------------------------------- | ------------------------ | ------------------ | ----------------------------------------------------------------- |
| **Navegação**                     |                          |                    |                                                                   |
| Buscar em chats                   | Ctrl + K                 | ⌘ + K              | Abre o campo de busca para encontrar conversas existentes.        |
| Abrir novo chat                   | Ctrl + Shift + O         | ⌘ + Shift + O      | Cria uma nova conversa em branco.                                 |
| Alternar barra lateral            | Ctrl + Shift + S         | ⌘ + Shift + S      | Expande ou recolhe o painel de navegação (lista de chats).        |
|                                   |                          |                    |                                                                   |
| **Operações em Chats**            |                          |                    |                                                                   |
| Copiar último bloco de código     | Ctrl + Shift + ;         | ⌘ + Shift + ;      | Copia para a área de transferência o último bloco de código gerado. |
| Excluir chat                      | Ctrl + Shift + Backspace | ⌘ + Shift + Delete (⌫) | Remove permanentemente o chat atual.                              |
| Focar no campo de entrada do chat | Shift + Esc              | Shift + Esc        | Move o foco diretamente para a área de digitação da mensagem.     |
|                                   |                          |                    |                                                                   |
| **Configurações & Ajuda**         |                          |                    |                                                                   |
| Mostrar atalhos                   | Ctrl + /                 | ⌘ + /              | Exibe a janela com todos os atalhos disponíveis.                  |
| Definir instruções personalizadas | Ctrl + Shift + I         | ⌘ + Shift + I      | Abre o modal para editar suas instruções de sistema.              |

## Testes

O projeto acompanha testes automatizados em Node.js. Instale as dependências com `npm install` e execute `npm test` para rodá-los.


## Licença

Nenhum arquivo de licença está presente neste repositório.
