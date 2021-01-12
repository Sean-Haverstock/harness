const { check, validationResult } = require("express-validator");

const generateValidators = () => [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Username minimum 6 characters required!")
    .bail(),
  check("password").custom((password, { req }) => {
    if (password !== req.body.confirmPassword) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
];

const reporter = (req, res, next) => {
  const result = validationResult(req);
  console.log("reporter", result.errors);

  if (!result.isEmpty()) {
    // const response = errors.array().map((error) => {
    // 	let obj = {};
    // 	obj[error.param] = error.msg;
    // 	return obj;
    // });
    // console.log('validator response', response);
    return res.status(400).json(result.errors);
  }

  next();
};

module.exports = {
  add: [generateValidators(), reporter],
};
