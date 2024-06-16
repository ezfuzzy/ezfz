const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserById } = require("../models/User");

// 패스포트 초기화
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// 직렬화
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 역직렬화
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
