
require('dotenv').config();

var Sequelize = require('sequelize');


var db = new Sequelize('postgres://teammerj:teammerjgirls@teammerj.ccfvuax37sga.us-west-2.rds.amazonaws.com:5432/merjDB');


//will change to env variables, but may need to direct require('dotenv').config() to correct location of .env file? not sure
//http://stackoverflow.com/questions/35356692/best-practice-when-using-an-api-key-in-node-js
// var db = new Sequelize('postgres://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@teammerj.ccfvuax37sga.us-west-2.rds.amazonaws.com:5432/merjDB');

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database', err);
  });

// create User table
var User = db.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  image: Sequelize.STRING
  //id (auto-generated)
  //createdAt (auto-generated)
  //updatedAt (auto-generated)
});

// create Event table
var Event = db.define('Event', {
  location: Sequelize.STRING,
  date: Sequelize.DATE,
  title: Sequelize.STRING,
  time: Sequelize.STRING,
  category: Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.TEXT,
  //id (auto-generated)
  //createdAt (auto-generated)
  //updatedAt (auto-generated)
  //HostId (generated by join)
  //EventId (generated by join)

});

// create Message table
var Message = db.define('Message', {
  message: Sequelize.STRING
  //id (auto-generated)
  //createdAt (auto-generated)
  //updatedAt (auto-generated)
  //chatroomId (generated by join)
  //UserId (generated by join)
});


//create Chatroom join table
// var EventMessage = db.define('EventMessage');
  //MessageId (generated by join)
  //EventId (generated by join)
  //createdAt (auto-generated)
  //updatedAt (auto-generated)

//create EventParticipant join table
var EventParticipant = db.define('EventParticipant', {
  // host: Sequelize.BOOLEAN,
  //id (auto-generated)
<<<<<<< HEAD
  EventId: Sequelize.INTEGER,
  UserId: Sequelize.INTEGER
=======
  //EventId (generated by join)
  //UserId (generated by join)
>>>>>>> 34cb01b5fe41c3d900858c5f283aa8ab3a5bec78
});

//sync individual tables listed above and create join tables
User.sync()
.then(() => User.belongsToMany(Event, {through: EventParticipant}))
.then(() => Event.belongsToMany(User, {through: EventParticipant }))
.then(() => Event.hasMany(Message, {foreignkey: {name: 'EventId'}}))
.then(() => Message.belongsTo(Event, {foreignkey: {name: 'EventId'}}))
.then(() => User.hasMany(Message, {foreignkey: {name:'UserId'}}))
.then(() => Message.belongsTo(User, {foreignkey: {name:'UserId'}}))
<<<<<<< HEAD
.then(() => User.sync())
.then(() => Event.sync())
.then(() => Message.sync());
=======
.then(() => Message.sync())
.then(() => Event.sync())
.then(() => User.sync());
>>>>>>> 34cb01b5fe41c3d900858c5f283aa8ab3a5bec78
// .then(() => Message.belongsTo(Event, {through: EventMessage }))
// .then(() => Event.belongsToMany(Message, {through: EventMessage }))

//export table schemas for use in other files
module.exports = {
  Event: Event,
  User: User,
  Message: Message,
  // EventMessage: EventMessage,
  EventParticipant: EventParticipant,
};