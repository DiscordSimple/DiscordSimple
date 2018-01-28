require("./config.js");
global.Discord = require("discord.js");
global._commands=[];
global.bot={
  botSelf: new Discord.Client(),
  token: config.token,
  prefix: config.prefix,
  ownerID: config.ownerID,
  helper: {

    registerCommand: function (cmd, _cb) {
      bot.botSelf.on('message', message => {
        var cb = [];
        cb["username"] = message.author.username;
        cb["userid"] = message.author.id;
        cb["channel"] = message.channel;
        cb["args"] = message.content.split(" ");
        cb["msg"] = message.content;

        if(message.content.split(" ")[0] == bot.prefix+cmd) {
          _cb(message, cb);
        }

      })
    }

  },
  init: function () {
    for(var i = 0; i<config.modules.length;i++) {
        require("./modules/"+config.modules[i]+'.js');
    }
    bot.botSelf.login(bot.token);
  }
}
