const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");
module.exports = () => {
  try {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, done) => {
          const user = await User.findOne({
            where: { email: email },
          });
          if (!user) {
            // 서버 에러, 성공 유무, 클라이언트 에러
            done(null, false, { reason: "존재하지 않는 이메일입니다." });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        }
      )
    );
  } catch (error) {
    console.error(error);
    return done(error);
  }
};
