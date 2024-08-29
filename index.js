const express = require("express");
const noblox = require("noblox.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function loginToRoblox() {
  try {
    const cookie = process.env.COOKIE;
    await noblox.setCookie(cookie);
    console.log("Logged into Roblox successfully.");
  } catch (error) {
    console.error("Failed to log into Roblox:", error);
  }
}
app.post("/changeRank", async (req, res) => {
  const { groupId, userId, newRank } = req.body;

  if (!groupId || !userId || !newRank) {
    return res.status(400).send("Missing required parameters: groupId, userId, or newRank.");
  }

  try {
    const rankChangeResult = await noblox.changeRank(groupId, userId, newRank);
    res.json({
      message: "Rank change successful",
      result: rankChangeResult
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred while changing the rank.");
  }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

app.post('/discord', async (req, res) => {
    const { pn, bn, warningNo } = req.body;

    try {
        playerName = pn
        breakerName = bn
        warnings = warningNo
        const channel = await client.channels.fetch(channelId);

        const message = await channel.send({
            content: '',
            embeds: [{
                title: 'Moderator Call',
                description: `Moderator called by: ${playerName}\nUsername of the rule breaker: ${breakerName}\nWarnings: ${warnings}\nPing: <@&1272252713224114207> \nStatus: Waiting :alarm_clock:`,
                color: 16711680,
            }],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 3,
                    label: 'Accept',
                    custom_id: 'accept_button',
                }],
            }],
        });

        res.status(200).send('Message sent to Discord!');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Failed to send message to Discord.');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'accept_button') {
        await interaction.update({
            content: '',
            embeds: [{
                title: 'Moderator Call',
                description: `Moderator called by: ${playerName}\nUsername of the rule breaker: ${breakerName}\nWarnings: ${warnings}\nStatus: Accepted :white_check_mark:`,
                color: 65280,
            }],
            components: [],
        });
    }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await loginToRoblox();
});
