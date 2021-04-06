const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");

const discord_token = process.env.DISCORD_TOKEN;

const greetings = ["Hello", "Hi", "Hey there"];
const goodbye = ["GG", "Goodbye", "Bye"];

// Create an instance of a Discord client
const client = new Discord.Client();

const { MessageEmbed } = Discord;

client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for new guild members
client.on("guildMemberAdd", (member) => {
  const uname = member.user.username;
  const memberId = member.user.id
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  // channel.send(`Welcome to the server, ${member}`);

  const greet = greetings[Math.floor(Math.random() * greetings.length)];
  const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(`${greet} ${uname}!`)
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setDescription(`Welcome to the server <@${memberId}>! Have fun in this server.`);
  // Send the embed to the same channel as the message
  channel.send(embed);
});

// Create an event listener for leaving guild members
client.on("guildMemberRemove", (member) => {
  const uname = member.user.username;
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  // channel.send(`Welcome to the server, ${member}`);

  const bye = goodbye[Math.floor(Math.random() * goodbye.length)];
  const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(`${bye} ${uname}!`)
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setDescription(`${uname} has left the server.`);
  // Send the embed to the same channel as the message
  channel.send(embed);
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(discord_token);
