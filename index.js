import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { loginValidation, registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./Controllers/UserController.js";
import * as PostController from "./Controllers/PostController.js";
import { postCreateValidation } from "./validations/post.js";
import handleErrors from "./utils/handleErrors.js";

mongoose
  .connect(
    "mongodb+srv://Marta:151096Ma@cluster0.wcl5gla.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((error) => console.log("DB error", error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleErrors, UserController.login);
app.post(
  "/auth/register",
  registerValidation,
  handleErrors,
  UserController.register
);
app.get("/auth/user", checkAuth, UserController.getUser);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Server OK");
});
