const Discord = require('discord.js');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const {token} = require('./config.json');
const client = new Discord.Client({intents: 32767});


client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}

});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'daily') {
	
		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle(`Bonjour ${interaction.user.tag} prête à commencer le daily ?`)
			//.setTitle("daily")
		
		const questionOne = new TextInputComponent()
			.setCustomId('questionOne')
			.setLabel("Qu'as-tu fais hier ?")
			.setStyle('PARAGRAPH');

		const questionTwo = new TextInputComponent()
			.setCustomId('questionTwo')
			.setLabel("Que vas tu faire aujourd'hui ?")
			.setStyle('PARAGRAPH');


		const firstActionRow = new MessageActionRow().addComponents(questionOne);
		const secondActionRow = new MessageActionRow().addComponents(questionTwo);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit()) return;

	const questionYesterday = interaction.fields.getTextInputValue('questionOne');
	const questionToday = interaction.fields.getTextInputValue('questionTwo');

	console.log({ questionYesterday, questionToday});
});

client.login(token);
 

