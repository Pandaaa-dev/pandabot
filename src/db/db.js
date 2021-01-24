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
                    ticketsystem BOOL,
                    ticketcategoryid varchar(255),
                    muterole varchar(255),
                    primary key(guildid));`, (err, res)=> { 
  if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS xp_level(
                  guildid varchar(255),
                  userid varchar(255),
                  points int,
                  level int,
                  primary key(guildid));`, (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS economy(
                  userid Varchar(255),
                  points int,
                  PRIMARY KEY(userid));`, (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS shop(
                  id int NOT NULL AUTO_INCREMENT, 
                  name Varchar(255),
                  price int,
                  PRIMARY KEY(id));`, (err, res)=> {
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

connection.query(`CREATE TABLE IF NOT EXISTS banned_words(
  id int NOT NULL AUTO_INCREMENT, 
  guildid varchar(255),
  word varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS tickets(
  id int , 
  guildid varchar(255),
  channelid varchar(255),
  userid varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS level_rewards(
  id int NOT NULL AUTO_INCREMENT, 
  type varchar(255),
  5award int, 
  10award int,
  20award int, 
  25award int,
  30award int,
  35award int,
  40award int,
  45award int,
  50award int,
  primary key(id));`
  , (err, res)=> {
if(err) console.log(err)
})




// connection.query(`ALTER TABLE guild_details 
//                   ADD lastticket int DEFAULT 0;`
//   , (err, res)=> {
// if(err) console.log(err)
// })
 

module.exports = connection

// ALTER TABLE table_name DROP COLUMN column_name