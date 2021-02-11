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


 connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.guild_details(
                    guildid varchar(255),
                    prefix varchar(255),
                    premium boolean,
                    nonewaccounts int(255),
                    muterole varchar(255),
                    ticketsystem BOOL,
                    ticketcategoryid varchar(255),
                    lastticket int,
                    welcomechannelid varchar(255),
                    loggingchannelid varchar(255),
                    logging BOOL,
                    sightseeing BOOL,
                    primary key(guildid));`, (err, res)=> { 
  if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.xp_level(
                  guildid varchar(255),
                  userid varchar(255),
                  points int,
                  level int);`, (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.economy(
                  userid Varchar(255),
                  points int,
                  PRIMARY KEY(userid));`, (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.shop(
                  id int NOT NULL AUTO_INCREMENT, 
                  name Varchar(255),
                  price int,
                  PRIMARY KEY(id));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.muted_members(
  id int NOT NULL AUTO_INCREMENT,
  guildid varchar(255),
  userid varchar(255),
  currtime varchar(255),
  expiresin varchar(255),
  PRIMARY KEY(id));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.only_pictures(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.no_pictures(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.no_links(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.banned_words(
  id int NOT NULL AUTO_INCREMENT, 
  guildid varchar(255),
  word varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.tickets(
  id int NOT NULL AUTO_INCREMENT, 
  guildid varchar(255),
  channelid varchar(255),
  userid varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.waifu(
  waifu varchar(255),
  husbandu varchar(255),
  amount int,
  divorceCount int DEFAULT 0,
  primary key(waifu));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS s581_GUILD_CONFIG.level_rewards(
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
//                   ADD column sightseeing BOOL DEFAULT 0;`
//   , (err, res)=> {
// if(err) console.log(err)
// })
 

module.exports = connection

// ALTER TABLE table_name DROP COLUMN column_name