import twit from "twit";
import dotenv from "dotenv";
dotenv.config();

const bot = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

function init() {
    var query = { 
        q: "#blackpink",
        result_type: "recent"
    };
    bot.get("search/tweets", query, latestTweet);
}

function latestTweet(err, data) {
    if (err) {
        console.log("we can't get tweets! " + err);
    } else {
        var id = {
            id: data.statuses[0].id_str
        }
        bot.post("statuses/retweet/:id", id, retweeted); 
    }
}

function retweeted(err) {
    if (err) {
        console.log("we can't retweet! " + err);
    } else {
        console.log("we retweet!");
    }
}

setInterval(init, 5 * 60 * 1000);
init();