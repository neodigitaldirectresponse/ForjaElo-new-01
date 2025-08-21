# ForjaElo 6.7 · SSA 8.7 — PRO (Fila 100% funcional)

**Objetivo**: gerar e enviar filas `prompt1~prompt2~...` para o ChatGPT de forma **robusta** (com pausar/retomar/cancelar, atrasos fixos/aleatórios, modos de envio, retries e detecção de geração).

## Instalação (Chrome/Brave/Edge Chromium)
1. Abra `chrome://extensions` e ative **Modo do desenvolvedor** (toggle no canto).
2. Clique **Carregar sem compactação** e selecione esta pasta.
3. Clique no ícone da extensão para abrir o **popup**.

## Uso direto (3 passos)
1. **Escolha a Trilha** (A–N) e **preencha os campos Base** (textos livres).
2. Clique **Gerar Fila (~)**. Você pode editar na área **Fila** (aceita `~` ou quebra de linha).
3. **Enfileirar** → escolha **Modo de envio** (Automático/Manual) e ajuste os **Atrasos** (fixo + aleatório).

> Dica: **Manual** copia tudo para sua área de transferência; cole no ChatGPT.  
> **Automático** abre/usa uma aba do ChatGPT e envia item a item, com opções avançadas.

## Opções de Envio
- **Modo**: Automático (envia no ChatGPT) ou Manual (apenas copia).
- **Estratégia de envio**: `Enter`, `Clique no botão` ou `Ambos` (mais compatível).
- **Espera entre prompts**:
  - **Tempo**: atraso fixo + aleatório (jitter).
  - **Detecção de geração** (opcional): espera o ChatGPT **começar** e **terminar** de gerar antes do próximo envio (com tempo máximo).
- **Retries**: quantas tentativas por prompt se algo falhar (ex.: seletor mudou).

## Controles ao vivo
- **Pausar**, **Retomar**, **Cancelar** a fila atual.
- **Deduplicar**, **Embaralhar**, **Limpar** a fila.
- **Importar .txt** / **Exportar .txt** da sua fila.

## Segurança e privacidade
- Sem chamadas de API: tudo acontece localmente no navegador.
- Dados armazenados em `chrome.storage.local`.
- Os templates (trilhas A–N) estão em `popup.js` → objeto `TRILHAS` (editável).

## Solução de problemas
- **Não colou no ChatGPT?** Troque a **Estratégia de envio** para `Clique` ou `Ambos` e/ou aumente os atrasos.
- **Mudança no site**: ative **Detecção de geração** + **Ambos**; se ainda falhar, use **Manual** (copia/cola).
- **Fila travou**: clique **Cancelar** e re-enfileire.
- **Enter criou nova linha**: preferir `Clique` no botão de envio.

Bom uso! — ForjaElo 6.7 · SSA 8.7


## Aplicar Agora (sem preencher nada)
- Na aba **Aplicar Agora**, escolha **Cenário** (Trilhas A–N ou **Tudo (A–N)**) e clique **Gerar (defaults)**.  
- Opcional: clique **Enfileirar Agora** para mandar direto ao ChatGPT (respeitando atrasos/espera configurados).  
- Os **defaults** foram escritos para funcionar sem bases específicas, pedindo que o SSA use padrões neutros, timers 25/5 e evite dados sensíveis.
