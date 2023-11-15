const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const organizationRouter = require("./routers/organization");

const app = express();
const port = 3006;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/", organizationRouter)

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "sciflare",
};

passport.use(
  new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    console.log(jwt_payload, "payload");
    if (jwt_payload.role) {
      return done(null, jwt_payload);
    } else {
      return done({ message: "Invalid role", statusCode: 401 }, false);
    }
  })
);

const User = require("./models/User");
const Organization = require("./models/Organization");

app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;
  console.log(req.body, "signup");
  const newOrganization = await Organization.create({ role });
  const newUser = await User.create({
    username,
    password,
    role: newOrganization._id,
  });

  res.json({ message: "Signup successful!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  const populatedUser = await User.findOne({ _id: user._id })
    .populate("role")
    .exec();

  const token = jwt.sign({ role: populatedUser.role.role, _id: user._id }, "sciflare", {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user);
    if(req.user.role === "admin"){
      const users = await User.find().populate("role", "role");
      res.json(users);
    }else{
      const user = await User.find({ _id: req.user._id }).populate("role", "role");
      res.json(user)
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
