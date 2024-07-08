const Sequelize = require('sequelize');
   const sequelize = require('../config/database');

   const db = {};

   db.Sequelize = Sequelize;
   db.sequelize = sequelize;

   db.User = require('./user')(sequelize, Sequelize);
   db.Owner = require('./owner')(sequelize, Sequelize);
   db.Housing = require('./housing')(sequelize, Sequelize);
   db.Booking = require('./booking')(sequelize, Sequelize);
   db.Comment = require('./comment')(sequelize, Sequelize);
   db.Equipment = require('./equipment')(sequelize, Sequelize);
   db.Notification = require('./notification')(sequelize, Sequelize);

   // Associations
   db.Owner.hasMany(db.Housing);
   db.Housing.belongsTo(db.Owner);

   db.Housing.hasMany(db.Booking);
   db.Booking.belongsTo(db.Housing);

   db.User.hasMany(db.Booking);
   db.Booking.belongsTo(db.User);

   db.User.hasMany(db.Comment);
   db.Comment.belongsTo(db.User);

   db.Housing.hasMany(db.Comment);
   db.Comment.belongsTo(db.Housing);

   db.Housing.belongsToMany(db.Equipment, { through: 'HousingEquipments' });
   db.Equipment.belongsToMany(db.Housing, { through: 'HousingEquipments' });

   db.User.hasMany(db.Notification);
   db.Notification.belongsTo(db.User);

   module.exports = db;




