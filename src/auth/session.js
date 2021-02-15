require("dotenv").config()

const redis = require("redis")
const session = require("express-session")

let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient(process.env.REDIS_URL)

const prodCookieSettings = {
  maxAge: (60 * 60000),
  httpOnly: true,
  secure: true, // false for dev
  sameSite: 'none'
}

const devCookieSettings = {
  maxAge: (60 * 60000)
}

const selectedCookieSettings = process.env.ENV_TYPE === 'development' ? devCookieSettings : prodCookieSettings;

const sessionOptions = {
  name: "Lowtide",
  secret: process.env.SESSION_SECRET,
  proxy: true,
  cookie: selectedCookieSettings,
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  resave: false
}

module.exports = session(sessionOptions)
