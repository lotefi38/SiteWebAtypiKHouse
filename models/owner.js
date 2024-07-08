module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    return Owner;
  };
