module.exports = (sequelize, DataTypes) => {
  const Housing = sequelize.define('Housing', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
  });
  Housing.associate = (models) => {
    Housing.belongsTo(models.Theme, { foreignKey: 'themeId', as: 'theme' });
    Housing.belongsTo(models.Owner, { foreignKey: 'OwnerId', as: 'owner' });
    Housing.hasMany(models.Booking, { foreignKey: 'HousingId' });
    Housing.hasMany(models.Comment, { foreignKey: 'HousingId' });
  };
  return Housing;
};



