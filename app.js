const { App } = require("@slack/bolt");
const schedule = require('node-schedule');
// Initializes your app with your bot token and signing secret
const app = new App({
	token: 'xoxb-3103946280277-3118854315429-qsxpYUBZayB6tFB3oOux6PVh',
	signingSecret: '67b4ddf8367c8b70e40b67c820742c01',
	socketMode: true, // enable the following to use socket mode
	appToken: 'xapp-1-A0349BKP2P2-3152560283590-d3896c71ee2cc1af646acedb9867df75d70e8b2f522303c1787feadd5f1ee495'
});

(async () => {
	const port = 3000
	// Start your app
	await app.start(port);
	console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();


// Listens to incoming messages that contain "hello"
app.message('daily', async ({ message, say }) => {
	// say() sends a message to the channel where the event was triggered
	await say({
		blocks: [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `Bonjour <@${message.user}>! Prête à commencer le daily ?`
				},
			},
			{
				"type": "actions",
				"block_id": "actions1",
				"elements": [
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Allons-y"
						},
						"value": "cancel",
						"action_id": "yes_btn"
					},
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Pas maintenant"
						},
						"value": "cancel",
						"action_id": "later_btn"
					}
				]
			},

		],

		text: `Hey there <@${message.user}>!`
	});
});

app.action('yes_btn', async ({ body, ack, say }) => {
	// Acknowledge the action
	await ack();
	await say({
		blocks: [
			{
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": "Allons-y, c'est parti pour le daily du jour!",
					"emoji": true
				}
			},
			{
				"type": "input",
				"block_id": "block_yesterday",
				"element": {
					"type": "plain_text_input",
					"multiline": true,
					"action_id": "action_yesterday"
				},
				"label": {
					"type": "plain_text",
					"text": "Qu'as-tu fais hier ?",
					"emoji": true
				}
			},
			{
				"type": "context",
				"elements": [
					{
						"type": "plain_text",
						"text": " ",
						"emoji": true
					}
				]
			},
			{
				"type": "input",
				"block_id": "block_today",
				"element": {
					"type": "plain_text_input",
					"multiline": true,
					"action_id": "action_today"
				},
				"label": {
					"type": "plain_text",
					"text": "Que vas tu faire aujourd'hui ?",
					"emoji": true
				}
			},
			{
				"type": "context",
				"elements": [
					{
						"type": "plain_text",
						"text": " ",
						"emoji": true
					}
				]
			},
			{
				"type": "input",
				"block_id": "block_problems",
				"element": {
					"type": "plain_text_input",
					"multiline": true,
					"action_id": "action_problems"
				},
				"label": {
					"type": "plain_text",
					"text": "Quels sont les irritants qui te ralentissent ou t'empêchent d'avancer ?",
					"emoji": true
				}
			},
			{
				"type": "actions",
				"elements": [
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Envoyer",
							"emoji": true
						},
						"value": "daily_submit",
						"action_id": "daily_submit"
					}
				]
			}
		],
	});
});

app.action('later_btn', async ({ body, ack, say }) => {
	// Acknowledge the action
	await ack();
	await say(`D'accord, dis moi quand tu est prêt(e)`);
});

app.action('daily_submit', async ({ body, ack, say }) => {
	// Acknowledge the action"block_id": "actions1",
	await ack();

	let yesterday = 'Non renseigné'
	if (body.state.values.block_yesterday.action_yesterday.value !== null) {
		yesterday = body.state.values.block_yesterday.action_yesterday.value
	}
	
	let today = 'Non renseigné'
	if (body.state.values.block_today.action_today.value !== null) {
		let today = body.state.values.block_today.action_today.value
	}

	let problems = 'Non renseigné'
	if (body.state.values.block_problems.action_problems.value !== null) {
		problems = body.state.values.block_problems.action_problems.value
	}

	await say(`Merci pour tes réponses.\n \n Hier tu as : ` + yesterday + `\n Aujourd'hui tu vas : ` + today + `\n Irritants rencontrés : ` + problems + `\n \n A Demain ! Passe une bonne journée !`);

});


/**
 * PROGRAMMED BOT MASSAGES
 */


const job = schedule.scheduleJob('10 * * * *', function(){
	 publishMessage("C034QUB5B7G", "Hello world :tada:");
   console.log('The answer to life, the universe, and everything!');
 });

 // Post a message to a channel your app is in using ID and message text
async function publishMessage(id, text) {
	try {
	  // Call the chat.postMessage method using the built-in WebClient
	  const result = await app.client.chat.postMessage({
		// The token you used to initialize your app
		token: "xoxb-3103946280277-3118854315429-qsxpYUBZayB6tFB3oOux6PVh",
		channel: id,
		text: text
		// You could also use a blocks[] array to send richer content
	  });
  
	  // Print result, which includes information about the message (like TS)
	  console.log(result);
	}
	catch (error) {
	  console.error(error);
	}
  }
  
