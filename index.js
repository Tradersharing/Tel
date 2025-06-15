export default {
  async fetch(request, env) {
    try {
      if (request.method !== "POST") {
        return new Response("Hanya menerima POST request.", { status: 405 });
      }

      const { BOT_TOKEN } = env;

      let data;
      try {
        const reqBody = await request.clone().text();
        data = JSON.parse(reqBody);
      } catch {
        return new Response("Invalid JSON", { status: 400 });
      }

      if (!data.message || !data.message.text) {
        return new Response(null, { status: 200 }); // <-- wajib kosong ke Telegram
      }

      const chatId = data.message.chat.id;
      const text = data.message.text;

      if (text === "/start") {
        const welcomeMsg = `👋 *Welcome to Tradersharing Signal!!*\n📡 *Click View below to see live trading signals!*\n✅ 📣 Join our official channel: 👉 https://t.me/info_seputarforex`;
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await fetch(telegramUrl, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMsg,
            parse_mode: "Markdown"
          }),
        });
      }

      return new Response(null, { status: 200 }); // <--- Telegram WAJIB ini
    } catch (err) {
      return new Response("Error: " + err.toString(), { status: 200 }); // biar telegram nggak error
    }
  },
};
