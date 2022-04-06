const { twId, twName } = require("../../../config");
const Twitter = require("twit");
require("dotenv").config();

const twitterConf = {
  consumer_key: process.env.TWKEY,
  consumer_secret: process.env.TWSECKEY,
  access_token: process.env.TWTOKEN,
  access_token_secret: process.env.TWSECTOKEN,
};

const twitter = new Twitter(twitterConf);
const { isTweet } = require("../../../useful");

let random = Math.floor(Math.random() * twId.length);
console.log(`Twitter de ${twName[random]}`);
const user = twId[random];

module.exports = async (client) => {
  let stream = twitter.stream("statuses/filter", {
    follow: user,
  });

  stream.on("tweet", (tweet) => {
    const channel = client.channels.cache.get(process.env.TWCHANNEL);
    if (!channel) return;

    if (isTweet(tweet)) {
      return channel.send(
        `${tweet.user.name} (@${tweet.user.screen_name}) twitteo esto: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
      );
    }
    if (tweet.retweeted_status) {
      return channel.send(
        `${tweet.user.name} (@${tweet.user.screen_name}) retwitteo esto: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.retweeted_status.id_str}`
      );
    }
    if (tweet.quoted_status_id_str) {
      return channel.send(
        `${tweet.user.name} (@${tweet.user.screen_name}) citó un tweet: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
      );
    }
    if (tweet.in_reply_to_status_id_str) {
      return channel.send(
        `${tweet.user.name} (@${tweet.user.screen_name}) comento un tweet: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
      );
    }
  });
};
