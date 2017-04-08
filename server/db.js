

var Sequelize = require('sequelize')


// var db = new Sequelize('postgres://teammerj:teammerjgirls@teammerj.ccfvuax37sga.us-west-2.rds.amazonaws.com:5432/merjDB');
// db
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database', err);
//   })
//intialize sequelize with postgres remote url
if (process.env.DATABASE_URL) {
  var db = new Sequelize(process.env.DATABASE_URL, {dialect:'postgres', logging: false});
} else {
  var db = new Sequelize('merj', process.env.POSTGRES_USER, '', {dialect:'postgres', logging: false});
}

// create User table
var User = db.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING
  //id (auto-generated)
  //createdAt (auto-generated)
  //updatedAt (auto-generated)
});

// create Event table
var Event = db.define('Event', {
  location: Sequelize.STRING,
  date: Sequelize.DATE,
  title: Sequelize.STRING,
  time: Sequelize.TIME,
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

//create Chatroom table
var Chatroom = db.define('Chatroom');
  //id (auto-generated)
  //eventId (generated by join)

//create EventParticipant table
var EventParticipant = db.define('EventParticipant', {
  host: Sequelize.BOOLEAN
  //id (auto-generated)
  //eventId (generated by join)
  //UserId (generated by join)
})

//sync individual tables listed above and create join tables
User.sync()
.then(() => User.hasMany(Event, {foreignkey: {name:'UserId'}}))
.then(() => User.hasMany(Message, {foreignkey: {name:'UserId'}}))
.then(() => Message.belongsTo(User, {foreignkey: {name:'UserId'}}))


//export table schemas for use in other files
module.exports = {
  Event: Event,
  User: User,
  Message: Message,
  Chatroom: Chatroom,
  EventParticipant: EventParticipant,
};

