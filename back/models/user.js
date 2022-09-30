module.exports = (sequelize, DataTypes) => {
  //User가 MYSQUL에는 users로 저장됨
  const User = sequelize.define(
    "User",
    {
      // id가 기본적으로 들어가 있다.
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
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장 허용
    }
  );
  // 일대일(사용자와 사용자의 정보묶음) hasOne
  // hasOne과 belongsTo는 유사하지만 차이점은 belongsTo는 새로운 collum이 생긴다.
  // foreinKey 무엇을 먼저 찾아야 하는지 명시
  User.associate = (db) => {
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
  };
  return User;
};
