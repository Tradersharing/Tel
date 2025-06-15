export default {
  async fetch(request, env) {
    try {
      const { BOT_TOKEN } = env;
      const data = await request.json();
      
      // Check apakah message valid
      if (data.message && data.message.text) {
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

          await fetch(telegramUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: welcomeMsg,
              parse_mode: "Markdown"
            })
          });

          console.log("Pesan /start berhasil dikirim ke chat id:", chatId);
          return new Response("OK");
        } else {
          console.log("Pesan bukan /start:", text);
          return new Response("No command matched.");
        }
      } else {
        console.log("Data bukan message:", JSON.stringify(data));
        return new Response("No message data.");
      }
    } catch (err) {
      console.log("Error di Worker:", err);
      return new Response("Error: " + err.toString());
    }
  }
};
