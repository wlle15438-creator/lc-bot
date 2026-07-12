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
const { Client, IntentsBitField, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ] 
});

// 1. تعريف الأوامر المائلة هنا (يمكنك إضافة أي أمر جديد بنفس الطريقة)
const commands = [
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('عرض قائمة المساعدة وجميع أوامر البوت المتاحة'),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('فحص سرعة اتصال البوت ومستوى الاستجابة')
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`البوت جاهز ومتصل باسم: ${client.user.tag}`);
    
    // 2. تسجيل الأوامر المائلة تلقائياً في ديسكورد عند تشغيل البوت
    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        console.log('جاري تحديث وتسجيل الأوامر المائلة (/) في ديسكورد...');
        
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        
        console.log('تم تسجيل جميع الأوامر المائلة بنجاح باهر وبدأت بالعمل!');
    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الأوامر:', error);
    }
});

// 3. الاستماع للأوامر المائلة وتنفيذها فوراً عند ضغط المستخدم عليها
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply({ 
            content: '👋 **أهلاً بك في قائمة المساعدة!**\n\n⚙️ **الأوامر المتاحة حالياً:**\n• `/help` - لعرض هذه القائمة.\n• `/ping` - لفحص سرعة استجابة البوت.\n\n*البوت يعمل الآن بأعلى استقرار 24/7!*' 
        });
    } else if (commandName === 'ping') {
        await interaction.reply({ content: `🏓 **بونج!** سرعة الاستجابة الحالية هي: \`${Date.now() - interaction.createdTimestamp}ms\`` });
    }
});

client.login(process.env.DISCORD_TOKEN);
const { Client, IntentsBitField, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ] 
});

// 📥 1. اكتب هنا جميع الأسماء والأوصاف للأوامر التي تريد إضافتها للبوت
const commands = [
    new SlashCommandBuilder().setName('help').setDescription('عرض قائمة المساعدة وجميع أوامر البوت'),
    new SlashCommandBuilder().setName('ping').setDescription('فحص سرعة اتصال واستجابة البوت'),
    
    // 👇 لإضافة أمر مائل جديد، انسخ السطر التالي وغير الاسم والوصف:
    // new SlashCommandBuilder().setName('اسم_الأمر_هنا').setDescription('وصف_الأمر_هنا'),

].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`البوت متصل ومستقر 24/7 باسم: ${client.user.tag}`);
    
    // ⚙️ 2. تسجيل الأوامر تلقائياً عند ديسكورد
    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('تم تسجيل وتحديث جميع الأوامر المائلة بنجاح!');
    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الأوامر:', error);
    }
});

// ⚡ 3. هنا تكتب وظيفة كل أمر وماذا يفعل البوت عندما يضغط عليه المستخدم
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    // تفاصيل أمر help
    if (commandName === 'help') {
        await interaction.reply({ 
            content: '👋 **أهلاً بك في قائمة المساعدة!**\n\n⚙️ **الأوامر المتاحة:**\n• `/help` - لعرض هذه القائمة.\n• `/ping` - لفحص سرعة استجابة البوت.' 
        });
    } 
    // تفاصيل أمر ping
    else if (commandName === 'ping') {
        await interaction.reply({ content: `🏓 **بونج!** سرعة الاستجابة الحالية: \`${Date.now() - interaction.createdTimestamp}ms\`` });
    }
    
    // 👇 لإضافة وظيفة لأمرك الجديد، انسخ الأسطر التالية واكتب الكود بداخلها:
    // else if (commandName === 'اسم_الأمر_هنا') {
    //     await interaction.reply({ content: 'الرد الذي يرسله البوت عند استخدام هذا الأمر' });
    // }
});

client.login(process.env.DISCORD_TOKEN);
