const mysql = require('mysql2');
const {DB_TEST} = require("../../config.json")

// create the connection to database
const connection = mysql.createConnection({...DB_TEST})
 
 connection.connect((err) => {
   if(err) {
    return console.log(err)
   }
   console.log("Connected to the Database!")
 })
console.log('hmm')
 connection.query('CREATE DATABASE IF NOT EXISTS customer_178208_guilddetails')


 connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.guild_details(
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
                    generalrole varchar(255) DEFAULT NULL,
                    primary key(guildid));`, (err, res)=> { 
  if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.xp_level(
                  guildid varchar(255),
                  userid varchar(255),
                  points int,
                  level int);`, (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.economy(
                  userid Varchar(255),
                  points int,
                  PRIMARY KEY(userid));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.shop(
                  id int NOT NULL AUTO_INCREMENT, 
                  name Varchar(255),
                  price int,
                  PRIMARY KEY(id));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.muted_members(
  id int NOT NULL AUTO_INCREMENT,
  guildid varchar(255),
  userid varchar(255),
  currtime varchar(255),
  expiresin varchar(255),
  PRIMARY KEY(id));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.only_pictures(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.no_pictures(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.no_links(
  channelid varchar(255),
  guildid varchar(255));`, (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.banned_words(
  id int NOT NULL AUTO_INCREMENT, 
  guildid varchar(255),
  word varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})
connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.tickets(
  id int NOT NULL AUTO_INCREMENT, 
  guildid varchar(255),
  channelid varchar(255),
  userid varchar(255),
  PRIMARY KEY(id));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.waifu(
  waifu varchar(255),
  husbandu varchar(255),
  amount int,
  divorceCount int DEFAULT 0,
  primary key(waifu));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.level_rewards(
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
connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.gift_inventory(
  userid varchar(255),
  Apple int, 
  Rose int,
  Chocolate int, 
  Dog int,
  Cat int,
  Tiger int,
  PS5 int,
  Laptop int,
  Car int,
  House int,
  Airplane int,
  Dragon int,
  World int,
  Moon int,
  Comet int,
  Love int,
  primary key(userid));`
  , (err, res)=> {
if(err) console.log(err)
})

connection.query(`CREATE TABLE IF NOT EXISTS customer_178208_guilddetails.huntshop_inventory(
  userid varchar(255),
  presentSword varchar(255), 
  swordQuestNo int,
  presentPotion varchar(255),
  potionQuestNo int, 
  ch1a int,
  ch2b int,
  ch3c int,
  ch4d int,
  ch5e int, 
  ch6f int, 
  ch7g int,
  ra1a int,
  ra2b int, 
  ra3c int,
  ra4d int, 
  ra5e int,
  ra6f int,
  ra7g int,
  su1a int,
  su2b int,
  su3c int, 
  su4d int,
  su5e int, 
  su6f int,
  primary key(userid));`
  , (err, res)=> {
if(err) console.log(err)
})
// {
//   "name": "White Truffle",
//   "price": 5000,
//   "code": "su7g"
// }
// Userid
// presentSword
// swordquestNo
// presentPotion
// potionQuestNo
// …inventory 5yItems





// connection.query(`ALTER TABLE customer_178208_guilddetails.huntshop_inventory
//                   drop su7g;`
//   , (err, res)=> {
// if(err) console.log(err)
// })

module.exports = connection

// ALTER TABLE table_name DROP COLUMN column_name