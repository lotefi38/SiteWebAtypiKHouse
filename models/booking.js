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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    });

    return Booking;
  };

