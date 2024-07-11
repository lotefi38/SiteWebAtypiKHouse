module.exports = (sequelize, DataTypes) => {
    const Destinations = sequelize.define('Destinations', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {});
  
    return Destinations;
  };
  