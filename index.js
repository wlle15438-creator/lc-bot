const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.once('ready', () => {
    console.log(`تم تشغيل البوت بنجاح ومستعد للعمل باسم: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.content === 'بينج') {
        message.reply('بونج! 🏓 البوت شغال وبأفضل حال.');
    }
});

client.login(process.env.DISCORD_TOKEN);
