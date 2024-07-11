module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      guests: {
        type: DataTypes.INTEGER,
       defaultValue: 0
      },
    }, {});
  
    Booking.associate = function(models) {
      Booking.belongsTo(models.Housing, {
        foreignKey: 'housingId',
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
      });
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete:'SET NULL', onUpdate: 'CASCADE',
      });
    };  

    return Booking;
  };

