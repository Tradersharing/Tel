export default {
  async fetch(request, env) {
    const { BOT_TOKEN } = env;

    try {
      const update = await request.json();

      if (!update.message || !update.message.text) {
        return new Response("No message or text", { status: 200 });
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

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const telegramResponse = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMsg,
            parse_mode: "Markdown"
          })
        });

        const telegramResult = await telegramResponse.json();

        if (!telegramResult.ok) {
          // Log error ke console (Cloudflare dashboard bisa lihat console.log)
          console.error("Telegram API error:", telegramResult);
          return new Response("Telegram API error", { status: 500 });
        }

        return new Response("OK", {
          status: 200,
          headers: { "Content-Type": "text/plain" }
        });
      }

      return new Response("No command matched.", { status: 200 });
    } catch (err) {
      console.error("Error processing update:", err);
      return new Response("Error", { status: 500 });
    }
  }
};
