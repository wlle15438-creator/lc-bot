const { Client, IntentsBitField, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ] 
});

const commands = [
    new SlashCommandBuilder().setName('help').setDescription('عرض قائمة المساعدة وجميع أوامر البوت'),
    new SlashCommandBuilder().setName('ping').setDescription('فحص سرعة اتصال واستجابة البوت')
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`البوت متصل ومستقر 24/7 باسم: ${client.user.tag}`);
    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('تم تسجيل وتحديث جميع الأوامر المائلة بنجاح!');
    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الأوامر:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply({ 
            content: '👋 **أهلاً بك في قائمة المساعدة!**\n\n⚙️ **الأوامر المتاحة حالياً:**\n• `/help` - لعرض هذه القائمة.\n• `/ping` - لفحص سرعة استجابة البوت.\n\n*البوت يعمل الآن بأعلى استقرار 24/7!*' 
        });
    } else if (commandName === 'ping') {
        await interaction.reply({ content: `🏓 **بونج!** سرعة الاستجابة الحالية: \`${Date.now() - interaction.createdTimestamp}ms\`` });
    }
});

client.login(process.env.DISCORD_TOKEN);
