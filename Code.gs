/**
 * GMAIL TO TELEGRAM NOTIFIER
 * Monitora e-mails de marketplaces e envia alerta para Telegram.
 */

function checkEmailsAndSendTelegram() {
  // ---------------- CONFIGURAÇÃO ----------------
  // IMPORTANTE: Mantenha estes dados genéricos no GitHub para sua segurança.
  // No seu script rodando no Google, você coloca os números reais.
  const telegramToken = "INSIRA_SEU_TOKEN_AQUI"; 
  const chatId = "INSIRA_SEU_CHAT_ID_AQUI";
  // ----------------------------------------------
  
  try {
    // 1. LISTA DE REMETENTES
    const remetentes = [
      "noreply@olx.com.br",
      "golem@estantevirtual.com.br",
      "nao-responder@mercadolivre.com",
      "donotreply@amazon.com",
      "notification@facebookmail.com"
    ];

    // 2. BUSCA OTIMIZADA
    // Procura apenas e-mails não lidos desses remetentes
    const threads = GmailApp.search(
      `is:unread (${remetentes.map(r => `from:${r}`).join(" OR ")})`,
      0,
      20
    );

    if (threads.length === 0) return;

    // 3. FILTRO TEMPORAL (Janela de 1.5 minuto)
    const agora = new Date();
    const emailsFiltrados = threads.filter(thread => {
      const email = thread.getMessages()[0];
      const diffMinutos = (agora - email.getDate()) / (1000 * 60);
      return diffMinutos <= 1.5; // Margem de segurança para o trigger de 1 min
    });

    Logger.log(`E-mails encontrados: ${threads.length} | Últimos 1,5min: ${emailsFiltrados.length}`);

    // 4. ENVIO PARA O TELEGRAM
    emailsFiltrados.forEach(thread => {
      try {
        const email = thread.getMessages()[0];
        const dataFormatada = Utilities.formatDate(email.getDate(), Session.getScriptTimeZone(), "HH:mm");
        
        // Limpa o corpo do e-mail para pegar só o início do texto (100 caracteres)
        const corpoLimpo = email.getPlainBody().substring(0, 100).replace(/\s+/g, ' ').trim();

        const texto = `🚨 *LEAD DETECTADO*\n\n` +
                      `🏢 *Canal:* ${email.getFrom()}\n` +
                      `⏰ *Hora:* ${dataFormatada}\n` +
                      `📝 *Msg:* ${corpoLimpo}...`;

        UrlFetchApp.fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "post",
          payload: {
            chat_id: chatId,
            text: texto,
            parse_mode: "Markdown"
          }
        });

        thread.markRead(); // Marca como lido para não repetir o alerta
      } catch (e) {
        Logger.log(`Erro ao processar thread: ${e.message}`);
      }
    });
  } catch (e) {
    Logger.log(`Erro geral: ${e.message}`);
  }
}
