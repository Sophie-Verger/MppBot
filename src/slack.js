const { App } = require("@slack/bolt");
const schedule = require('node-schedule');
//const cron = require('node-cron');
const SLACK_TOKEN = 'xoxb-3103946280277-3118854315429-qsxpYUBZayB6tFB3oOux6PVh';
const SLACK_SIGNING_SECRET = '67b4ddf8367c8b70e40b67c820742c01';
const SLACK_APP_TOKEN = 'xapp-1-A0349BKP2P2-3152560283590-d3896c71ee2cc1af646acedb9867df75d70e8b2f522303c1787feadd5f1ee495';

// Initializes your app with your bot token and signing secret
const app = new App({
	token: SLACK_TOKEN,
	signingSecret: SLACK_SIGNING_SECRET,
	socketMode: true, // enable the following to use socket mode
	appToken: SLACK_APP_TOKEN
});

(async () => {
	const port = 3000
	// Start your app
	await app.start(port);
	console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();


// schedular. Send daily every day from monday to sunday at 9.00
const job = schedule.scheduleJob('00 09 * * 1-5', function () {
	scheduleSlack()
})

// function that get list of all all private channel ids then publish message
function scheduleSlack() {
	app.client.conversations.list({
		token: SLACK_TOKEN,
		types: 'im'
	}).then((res) => {
		let conv = Object.entries(res.channels)
	
		for (let i = 0; i < conv.length; i++) {
			conv[i].forEach(element => {
				if (typeof (element) == 'object' && element.user !== 'USLACKBOT') {
					let channelId = element.id;
					app.client.users.info({
						token: SLACK_TOKEN,
						user: element.user,
					}).then((user) =>  {
						let username = user.user.profile.first_name;
						publishMessage(username, channelId)
					})
				}
			})
		}
	})
}

// Post the scheduled daily message to each private channel
async function publishMessage(username, channelId) {
	try {
		// Call the chat.postMessage method using the built-in WebClient
		const result = await app.client.chat.postMessage({
			// The token you used to initialize your app
			token: "xoxb-3103946280277-3118854315429-qsxpYUBZayB6tFB3oOux6PVh",
			channel: channelId,
			blocks: [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `Bonjour ` + username + ` ! Prêt(e) à commencer le daily ?`
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
			]
		});
	}
	catch (error) {
		console.error(error);
	}
}

// Listens to incoming messages that contain "\daily" and send daily introduction
app.message('\daily', async ({ message, say }) => {
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

// send the daily questions if the user said he is ready
app.action('yes_btn', async ({ack, say }) => {
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

// send answer if user want to answer the daily later
app.action('later_btn', async ({ack, say }) => {
	await ack();
	await say(`D'accord, dis moi quand tu est prêt(e). Pour cela, ecrit \daily dans ce channel`);
});

// send massage with all user answers, to the private channel and to the test-mppbot channel
app.action('daily_submit', async ({ body, ack, say }) => {
	await ack();

	let yesterday = 'Non renseigné'
	if (body.state.values.block_yesterday.action_yesterday.value !== null) {
		yesterday = body.state.values.block_yesterday.action_yesterday.value
	}

	let today = 'Non renseigné'
	if (body.state.values.block_today.action_today.value !== null) {
		today = body.state.values.block_today.action_today.value
	}

	let problems = 'Non renseigné'
	if (body.state.values.block_problems.action_problems.value !== null) {
		problems = body.state.values.block_problems.action_problems.value
	}

	await say(`Merci pour tes réponses.\n \n Hier tu as : ` + yesterday + `\n Aujourd'hui tu vas : ` + today + `\n Irritants rencontrés : ` + problems + `\n \n A Demain ! Passe une bonne journée !`);

	sendResponseToMppBotChannel(body.user.id, yesterday, today, problems)	
});

// function that search user by the given id then send message with answers to test-mppbot channel
  function sendResponseToMppBotChannel(userId, yesterday, today, problems) {
	app.client.users.info({
		token: SLACK_TOKEN,
		user: userId,
	}).then((user) =>  {
		app.client.chat.postMessage({
			token: SLACK_TOKEN,
			channel: 'C034QUB5B7G',
			blocks: [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `\n \n Voici les réponses du jour de <@${user.user.profile.first_name}> ! \n \n Activités d'hier : ` + yesterday + `\n Activités d'aujourd'hui : ` + today + `\n Irritants rencontrés : ` + problems + `\n \n`
					},
				},
			]
		});
	})
  }