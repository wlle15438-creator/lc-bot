const { Client, IntentsBitField } = require('discord.js');
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ] 
});

client.once('ready', () => {
    console.log('البوت جاهز ومتصل بنجاح');
});

client.on('messageCreate', (message) => {
    if (message.content === 'بينج') {
        message.reply('بونج! 🏓 البوت شغال بأفضل حال ومستقر.');
    }
});

client.login(process.env.DISCORD_TOKEN);
