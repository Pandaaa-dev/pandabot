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
                    nonewaccounts int(255),
                    verificationchannelid varchar(255),
                    verificationmessage varchar(255),
                    verificationroleid varchar(255),
                    verification BOOL,
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

connection.query(`CREATE TABLE IF NOT EXISTS muted_members(
  guildid varchar(255),
  userid varchar(255),
  currtime TIMESTAMP,
  expiresin TIMESTAMP);`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS only_pictures(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS no_links(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})
module.exports = connection