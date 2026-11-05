const express = require('express')
const cors = require('cors')
const authRoutes = require("./routes/auth.routes")
const cookieParser = require('cookie-parser')
const postRoutes = require("./routes/post.routes")

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Multer / general error handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ success: false, error: "File too large (max 5MB)" })
  }
  return res.status(400).json({ success: false, error: err.message })
})

module.exports = app