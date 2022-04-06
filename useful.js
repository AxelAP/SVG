module.exports = {
  validMention: function (msg, arg) {
    var valid = true;
    let m = arg.match(/<@!?(.*?[0-9])>/);
    if (m == null || !msg.guild.members.cache.has(m[1])) {
      return (valid = false);
    }
    return (valid = true);
  },
  validEmote: function (arg) {
    var valid = true;
    let e = arg.match(/<a?:.+:\d+>/gm);
    if (e == null) {
      return (valid = false);
    }
    return (valid = true);
  },
  validChannel: function (msg, arg) {
    var valid = true;
    let c = arg.match(/<#(.*?)>/);
    if (c == null || !msg.guild.channels.cache.has(c[1])) {
      return (valid = false);
    }
    return (valid = true);
  },
  validAttachmentsUrl: function (arg) {
    var valid = true;
    let a = arg.match(
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)?([%|/|.|\w|\-|?|=|&]?)*/g
    );
    if (a == null) {
      return (valid = false);
    }
    return (valid = true);
  },
  randPresence: function (client) {
    setInterval(async function () {
      const prSchema = require("./models/prSchema");
      let prData = await prSchema.findOne({
        botID: client.user.id,
      });

      let activities = [`PLAYING`, `LISTENING`, `WATCHING`];
      let moods = prData.presence;

      let mood = moods[Math.floor(Math.random() * moods.length)];
      let activity = activities[Math.floor(Math.random() * activities.length)];

      client.user.setPresence({
        activities: [
          {
            name: `${mood}`,
            type: `${activity}`,
          },
        ],
      });
    }, 1800000);
  },
  randReply: async function (client, message) {
    const repSchema = require("./models/repSchema");

    let repData = await repSchema.findOne({
      botID: client.user.id,
    });

    let replies = repData.reply;
    let random = Math.floor(Math.random() * replies.length);

    let reply = replies[random];
    message.channel.send(reply);
    return;
  },
  wordMsg: async function (message) {
    const wdSchema = require("./models/wdSchema");
    let { wordDel } = require("./useful");
    const word = message.content;

    let wdData = await wdSchema.findOne({
      serverID: message.guild.id,
      word: word.toLowerCase(),
    });

    if (wdData) {
      if (await wordDel(message)) {
        wdData = await wdSchema.findOne({
          serverID: message.guild.id,
          word: word.toLowerCase(),
        });
      }
    }

    if (wdData) {
      let text = wdData.text;
      let image = wdData.image;

      if (text && image) {
        message.channel.send({ content: text, files: [image] });
      }
      if (text && !image) {
        message.channel.send(text);
      }
      if (!text && image) {
        message.channel.send(image);
      }
    }
  },
  wordDel: async function (message) {
    const delSchema = require("./models/delSchema");
    const wdSchema = require("./models/wdSchema");

    let delData = await delSchema.findOne({
      serverID: message.guild.id,
      command: `word`,
    });
    if (delData) {
      let wdData = await wdSchema.find({
        serverID: message.guild.id,
      });

      let del = delData.delete;

      for (let i = 0; i < wdData.length; i++) {
        for (let n = 0; n < del.length; n++) {
          if (del[n] === i) {
            await wdSchema.deleteOne({
              serverID: message.guild.id,
              word: wdData[i].word,
            });
          }
        }
      }

      await delSchema.deleteOne({
        serverID: message.guild.id,
        command: `word`,
      });

      return true;
    }
    return false;
  },
  isTweet: function (tweet) {
    if (
      tweet.retweeted_status ||
      tweet.in_reply_to_status_id_str ||
      tweet.quoted_status_id_str
    )
      return false;
    return true;
  },
};
