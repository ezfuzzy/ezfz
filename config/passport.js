const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserById } = require("../models/user");

// 패스포트 초기화
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      // serializeUser에서 사용자 정보를 세션에 저장
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  // $1: error, $2: identifier
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user); // >  req.user 설정
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
