const db = require ("quick.db")
const discord = require ('discord.js')
const { COLOR } = require("../config.json");
const { getInfo } = require("../handlers/xp.js")
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

module.exports = {
    name: "level",
    description:"Get the level",
    execute: async(client,message,args) => {
      const user = message.mentions.users.first() || message.author;
     if(user.id === client.user.id) { //IF BOT
      return message.channel.send("😉 | I am on level 100")
    }
if(user.bot) {
      return message.channel.send("Bot do not have levels")
    }

 let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    
    const {level, remxp, levelxp} = getInfo(xp);
if(xp === 0) return message.channel.send(`**${user.tag}** is out of the xp`)

let embed = new discord.MessageEmbed()
    .setAuthor(user.username, message.guild.iconURL())
    .setColor("#ff2050")
    .setThumbnail(user.avatarURL())
    .setDescription(`**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`)
        
    .setFooter('© Created by LarSpeed & @Muhammadbagus')
 message.channel.send(embed)   
    }
}