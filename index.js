// Require the necessary discord.js classes
const Discord = require('discord.js');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const {token} = require('./config.json');
// Create a new client instance
const client = new Discord.Client({intents: 32767});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Listen for interactions Slash
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}

});

// Modal Daily
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'daily') {
		
		// Create the modal
		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle(`Bonjour ${interaction.user.tag} prête à commencer le daily ?`)
		
		// Add components to modal
		// Create the text input components
		const questionOne = new TextInputComponent()
			.setCustomId('questionOne')
			// The label is the prompt the user sees for this input
			.setLabel("Qu'as-tu fais hier ?")
			// Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');

		const questionTwo = new TextInputComponent()
			.setCustomId('questionTwo')
			.setLabel("Que vas tu faire aujourd'hui ?")
			.setStyle('PARAGRAPH');


		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new MessageActionRow().addComponents(questionOne);
		const secondActionRow = new MessageActionRow().addComponents(questionTwo);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal
		await interaction.showModal(modal);
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit()) return;

	// Get the data entered by the user
	const questionYesterday = interaction.fields.getTextInputValue('questionOne');
	const questionToday = interaction.fields.getTextInputValue('questionTwo');

	console.log({ questionYesterday, questionToday});
});

// Login to Discord with your client's token
client.login(token);
 

