import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Enter the title of the article")
    .isLength({ min: 3 })
    .isString(),
  body("title", "Enter the text of the article")
    .isLength({ min: 3 })
    .isString(),
  body("tags", "Tag format is incorrect").optional().isString(),
  body("imageURL", "Image URL is incorrect").optional().isString(),
];
