# Backend changes (frontend ke liye zaroori)

## 1. CORS
npm i cors

app.js:
```js
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));  // express.json() se pehle
```

## 2. GET posts  (post.controller.js)
```js
async function getPostsController(req, res) {
  try {
    const posts = await postModel.find().populate("user", "username").sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
module.exports = { createPostController, getPostsController };
```
Export badla hai, isliye post.routes.js mein:
```js
const { createPostController, getPostsController } = require("../controller/post.controller");
router.get("/", authMiddleware, getPostsController);
```
(populate ke liye post model ka ref user model ke registered naam jaisa hona chahiye)

## 3. /auth/me aur /auth/logout  (auth.routes.js)
```js
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware, (req, res) => {
  const { password, ...user } = req.user.toObject();
  res.json({ user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
```
