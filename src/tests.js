require('dotenv').config();
const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const app = new App({
	token: process.env.SLACK_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	socketMode: true, // enable the following to use socket mode
	appToken: process.env.SLACK_APP_TOKEN
});

app.client.api.test()
.then((response) => {
  console.log(response)
})