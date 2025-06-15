
export default {
  async fetch(request, env) {
    const { BOT_TOKEN } = env;
    const update = await request.json();

    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (text === "/start") {
      const welcomeMsg = \`
👋 *Welcome to Tradersharing Signal!!*

📡 *Click View below to see live trading signals!*

✅ 📣 Join our official channel:
👉 https://t.me/info_seputarforex
      \`;

      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      await fetch(telegramUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeMsg,
          parse_mode: "Markdown"
        })
      });

      return new Response("OK");
    }

    return new Response("No command matched.");
  }
};
