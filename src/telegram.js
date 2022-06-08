require('dotenv').config();
const { Markup, Scenes, session, Telegraf} = require('telegraf');
const Composer = require('telegraf');
const WizardScene = require('telegraf');
const Stage = require('telegraf');


// Création de la scène du daily

const dailyWizard = new Scenes.WizardScene(
    'DAILY_ID', // first argument is Scene_ID, 
    (ctx) => {
        ctx.reply("Début du daily");

        ctx.reply("Qu'as-tu fais dans ton précédent jour de travail ?");
        ctx.wizard.state.daily = {};
        return ctx.wizard.next();
    },
    (ctx) => {
        
        ctx.wizard.state.daily.yesterday = ctx.message.text;
        ctx.reply("Que vas tu faire aujourd'hui ?");
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.daily.today = ctx.message.text;
        ctx.reply("Quels sont les irritants qui te ralentissent ou t'empêchent d'avancer ?");
        return ctx.wizard.next();
    },

    (ctx) => {
        ctx.wizard.state.daily.annoyances = ctx.message.text;
        console.log(ctx.wizard.state);
        ctx.reply(ctx.wizard.state.daily);
        // renvoyer les infos quelque part en extérieur. Un canal, ou 
        return ctx.scene.leave();
    },
  );

const stage = new Scenes.Stage([dailyWizard]);

///// initialisation du bot

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.use(stage.middleware());

/// commandes
bot.command('daily', (ctx) => {
    ctx.scene.enter('DAILY_ID');
});


bot.hears('test', (ctx) => {
    ctx.reply("C'est ok pour moi");
})


bot.command('chat', (ctx) => {
    let convId = ctx.message.from.id; // est l'ID de la personne, du chat sinon
    let callerId = ctx.message.chat.id; // les carac' du messages, liées à la personne l'ayant émis
    ctx.reply(callerId);
    ctx.reply(convId);
    let nbr = ctx.telegram.getChatMembersCount(convId);
    let nbr2 = ctx.telegram.getChatMembersCount(callerId);
    ctx.reply(nbr);
    ctx.reply(nbr2);
});


// lancement
bot.launch();