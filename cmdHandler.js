const cmdErrorEmbed = require("./utilities/errorInCommandUsage")
const errorEmbed = require("./utilities/errorEmbed")
const validPermissions = require("./utilities/validPerms")
const deleteMsg = require("./utilities/deleteMsg")

const cmdHandler = async (command, message, args, text, client) => {
  
      //Checking if ive given the correct permission in the command Dependency  
      if(command.requiredPermissions.length >= 1){
        command.requiredPermissions.forEach(perm => {
           if(!validPermissions.includes(perm)) { 
                throw Error('Invalid Permissions Given!')
            }
        })
      }

      //Check if the command is an nsfw command and the channel is nonNsfw
      if(command.isNSFW != message.channel.nsfw && command.isNSFW  ){
        const desc = "Missing appropriate channel permissions[NSFW may or may not be needed to be changed]"
        const embed = errorEmbed(command, client, message, "Not the right permissions!", desc )
        deleteMsg(message)
        message.channel.send(embed)
        return
      }
      
      //Check if the command is not being used correctly
      if(args.length < command.minArgs || args.length > command.maxArgs) {
        deleteMsg(message)
      const arr =command.usage("!")
      const embed = cmdErrorEmbed(command, client, message, arr)
          message.channel.send(embed)
        return
      }


       //Check if the member has the required permissions to run the command
       if(command.requiredPermissions.length >= 1){
          let hasPerms = true
          command.requiredPermissions.forEach(perm => {
            if(!message.member.permissions.has(perm, {checkAdmin: true})){
                  hasPerms = false
            }
          })
          if(hasPerms == false) {
            deleteMsg(message)
            const desc = "You do not have the required permissions to run this command!" 
              const embed = errorEmbed(command, client, message, "Not the right permissions!", desc )
          
                message.channel.send(embed)
              return
          }
        }

      //Special Check for Moderation commands
        if(command.highValue){
            if(!message.mentions.users.first()) {
              const embed = errorEmbed(command, client, message, "No Mentions!", `This command absolutely needs mentions to work. So pleaase
              mention someone!`)
              deleteMsg(message)
              message.channel.send(embed)
              return
            } 
           let isLowerThanMentionedUser = false
              message.mentions.users.map(user => {
                const guildMember = message.guild.member(user)
                 const author = message.member
                  if(author.roles.highest.rawPosition < guildMember.roles.highest.rawPosition){
                   const embed = errorEmbed(command, client, message, "Insufficient Perms!", `The person you are trying to take action against is bigger than you in the role hierarchy!`)
                     message.channel.send(embed)
                      isLowerThanMentionedUser = true 
                      deleteMsg(message)
                      return  
                    }
                  })
              if(isLowerThanMentionedUser) return     
        }      
    command.execute(message, args, text, client)

}
module.exports = cmdHandler