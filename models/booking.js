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
        allowNull: false,
      },
    });
  
    Booking.associate = function(models) {
      Booking.belongsTo(models.Housing, {
        foreignKey: 'housingId',
        onDelete: 'CASCADE',
      });
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    };  

    return Booking;
  };

