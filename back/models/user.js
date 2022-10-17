const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT,DATETIME
          allowNull: false, // 필수가 아니냐? false
          unique: true, // 중복 방지
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // false가 필수
        },
        password: {
          type: DataTypes.STRING(100), // 비밀번호는 암호화를 하면 길이가 늘어나기 때문에 넉넉하게 만들어줘야 한다.
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollwerId",
    });
  }
};
