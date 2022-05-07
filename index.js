const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const ListDirectory = require('./ListDirectory.js')
const TOKEN = '5224056154:AAHruF4BuNctnOl6JLBSfYNwGtDx6DSAS6o';
const url = 'https://e739-87-249-134-130.ngrok.io';
const port = 4000;



// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN, {webHook:true});

// This informs the Telegram servers of the new webhook.
 bot.setWebHook(`${url}/bot${TOKEN}`); 
bot.getMe((req,res)=>{
console.log(req)
})

const app = express();

// parse the updates to JSON
app.use(express.json()); 

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
  });


bot.on('message', async msg => {
  switch (msg.text) {
    case '/start':
      bot.sendMessage(msg.chat.id, 'Olá ' + msg.from.first_name)
      break;
    case '/photos':
      let photos = await ListDirectory('./photos'); 
      bot.sendMessage(msg.chat.id, 'Carregando...')
      bot.sendChatAction('-1001567360573', 'upload_photo')
      bot.sendMediaGroup('-1001567360573', photos) 
      console.log(msg)
      break;

    case '/videos':
      let videos = await ListDirectory('./video')
      bot.sendMessage(msg.chat.id, 'Carregando...')
      bot.sendMediaGroup(msg.chat.id, videos)
      console.log(msg)
       break;

       case '/canal':
        let CanalVideo = await ListDirectory('./video');
        bot.sendMessage(msg.chat.id, 'Carregando...')
        bot.sendMediaGroup('-1001567360573', CanalVideo)
        console.log(msg)
        break;
  
    default:
      bot.sendMessage(msg.chat.id, 'ola')
      console.log(msg)
      break;
  }
})

