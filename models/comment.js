module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Comment.associate = function(models) {
      Comment.belongsTo(models.User);
      Comment.belongsTo(models.Housing);
    };

    return Comment;
  };
