import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { v4 as uuidv4 } from 'uuid'
import config from './config.json' with { type: 'json' }
import { isAuthenticated } from './middlewares.js'
import * as routers from './routers/_routers.js'
import './strategies/_strategies.js'

const app = express()
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    proxy: true,
    name: uuidv4(),
    cookie: {
      maxAge: 3600000, // 1h
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/local', routers.localRouter)
app.use('/api/google', routers.googleRouter)
app.use('/api/github', routers.githubRouter)

app.get('/api/auth/status', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'You are authorized',
    answer: req.user,
  })
})

app.post('/api/auth/logout', isAuthenticated, (req, res) => {
  req.logout(err => {
    if (err) {
      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully logged out',
      answer: true,
    })
  })
})

const port = config.SERVER_PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
