export default {
  async fetch(request, env) {
    try {
      if (request.method !== "POST") {
        return new Response("Hanya menerima POST request.", { status: 405 });
      }

      const { BOT_TOKEN } = env;

      // Explicitly clone the request body
      const reqBody = await request.clone().text();
      const data = JSON.parse(reqBody);

      if (!data.message || !data.message.text) {
        return new Response("Bukan pesan teks Telegram.", { status: 200 });
      }

      const chatId = data.message.chat.id;
      const text = data.message.text;

      if (text === "/start") {
        const welcomeMsg = `
👋 *Welcome to Tradersharing Signal!!*

📡 *Click View below to see live trading signals!*

✅ 📣 Join our official channel:
👉 https://t.me/info_seputarforex
`;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const tgResp = await fetch(telegramUrl, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMsg,
            parse_mode: "Markdown"
          })
        });

        const tgJson = await tgResp.json();
        console.log("Telegram API Response:", JSON.stringify(tgJson));

        return new Response("Pesan berhasil dikirim.", { status: 200 });
      }

      return new Response("Perintah tidak dikenali.", { status: 200 });

    } catch (err) {
      console.log("Worker error:", err.stack || err);
      return new Response("Worker error: " + (err.stack || err.toString()), { status: 500 });
    }
  }
};
