export default {
  async fetch(request, env) {
    try {
      const update = await request.json();

      if (!update.message || !update.message.text) {
        return new Response("No message text", { status: 200 });
      }

      const chatId = update.message.chat.id;
      const text = update.message.text;

      if (text === "/start") {
        const welcomeMsg = `
👋 *Welcome to Tradersharing Signal!!*

📡 *Click View below to see live trading signals!*

✅ 📣 Join our official channel:
👉 https://t.me/info_seputarforex
`;

        const telegramUrl = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;
        const resp = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMsg,
            parse_mode: "Markdown",
          }),
        });

        const data = await resp.json();
        if (!data.ok) {
          console.error("Telegram API error:", data);
          return new Response("Telegram API error", { status: 500 });
        }
      }

      return new Response("OK", { status: 200 });
    } catch (e) {
      console.error("Worker error:", e);
      return new Response("Error", { status: 500 });
    }
  }
};
