const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const ListDirectory = require('./ListDirectory.js')
const {TOKEN,URL,PORT} = process.env

const bot = new TelegramBot(TOKEN, {webHook:true});

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
      break;

    case '/videos':
      let videos = await ListDirectory('./video')
      bot.sendMessage(msg.chat.id, 'Carregando...')
       break;
  
    default:
      bot.sendMessage(msg.chat.id, 'ola')
      break;
  }
})

