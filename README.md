# 🤖 Sales Ops Notifier: Centralizando Vendas em Tempo Real

> Automação em Google Apps Script para monitorar múltiplos canais de venda (Marketplaces) e notificar via Telegram, eliminando a checagem manual e reduzindo o tempo de resposta ao lead.

## 🎯 O Problema de Negócio
Vender em múltiplas plataformas (OLX, Mercado Livre, Estante Virtual, Amazon) gera um custo operacional alto:
- **Fadiga de Alerta:** Excesso de notificações misturadas com e-mails pessoais.
- **Lead Response Time:** A necessidade de checar manualmente 4 apps diferentes aumentava o tempo de resposta.
- **Context Switching:** Interrupções constantes no fluxo de trabalho principal.

## 🛠 A Solução
Desenvolvi um "SDR Robô" que centraliza a entrada de leads. O script atua como um middleware que filtra, processa e encaminha apenas o que é relevante.

### Arquitetura:
1.  **Monitoramento (Cron Job):** O script roda a cada **1 minuto** no Gmail.
2.  **Filtro de Sinal vs. Ruído:** Identifica apenas e-mails transacionais (chat ou nova venda) de remetentes específicos.
3.  **Janela Temporal:** Processa apenas eventos ocorridos nos últimos 1.5 minutos para evitar duplicidade.
4.  **Delivery:** Envia um alerta formatado para um canal privado no Telegram (atuando como um Pager).

## ⚙️ Stack Tecnológica
- **Linguagem:** JavaScript (Google Apps Script)
- **Integrações:** Gmail API + Telegram Bot API
- **Infraestrutura:** Serverless (Google Cloud)

## 🚀 Como usar este script

### 1. Configuração no Telegram
- Fale com o `@BotFather` para criar um novo bot e obter o `API Token`.
- Fale com o `@userinfobot` para descobrir seu `Chat ID`.

### 2. Instalação
1. Crie um novo projeto em [script.google.com](https://script.google.com).
2. Cole o código do arquivo `Code.gs` deste repositório.
3. Substitua as variáveis `telegramToken` e `chatId` pelos seus dados.
4. Customize a lista `const remetentes` com os e-mails das plataformas que deseja monitorar.

### 3. Automação (Trigger)
No editor do Apps Script, vá em **Acionadores (Triggers)** e configure:
- **Origem:** Baseado no tempo (Time-driven)
- **Tipo:** Contador de minutos (Minutes timer)
- **Intervalo:** A cada minuto (Every minute)

---
*Projeto desenvolvido para otimizar a eficiência operacional em vendas B2C.*
