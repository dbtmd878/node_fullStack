module.exports = (sequelize, DataTypes) => {
  //User가 MYSQUL에는 users로 저장됨
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 이모티콘을 추가하려면 mb4를 넣어줘야 함
      collate: "utf8mb4_general_ci", // 한글 저장 허용
    }
  );
  // db.해당 데이터.관계(db.타겟데이터, {throuth:"새로생기는 테이블 이름", as:"구분하기 위한 이름"})
  Post.associate = (db) => {
    // 모델관계를 설정해주면 단수, 복수에 따라 아래와 같이 add... , remove..., set..., get...가 생김

    db.Post.belongsTo(db.User); // post.addUser
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // post.addLikers, post.removeLikers 가 생김
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
  };
  return Post;
};
