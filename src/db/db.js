const mysql = require('mysql2');
const {DB} = require("../../config.json")
 
// create the connection to database
const connection = mysql.createConnection({...DB})
 
 connection.connect((err) => {
   if(err) {
    return console.log(err)
   }
   console.log("Connected to the Database!")
 })

 connection.query("CREATE DATABASE IF NOT EXISTS GUILD_CONFIG", (err, res)=> {
    if(err) console.log(err)
    // console.log(res)
 })
 connection.query(`CREATE TABLE IF NOT EXISTS guild_details(
                    guildid varchar(255),
                    prefix varchar(255),
                    premium boolean,
                    privatelog varchar(255),
                    publiclog varchar(255),
                    muterole varchar(255),
                    primary key(guildid));`, (err, res)=> {
  if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS xp_level(
                  guildid varchar(255),
                  userid varchar(255),
                  points varchar(255),
                  primary key(guildid));`, (err, res)=> {
if(err) console.log(err)
})
module.exports = connection