const uuid = require("uuid");

const checkUuid = (req, res, next) => {
  const userId = req.params.userId;
  if (!uuid.validate(userId)) {
    res.status(400).json({ message: "Invalid UUID" });
  } else {
    next();
  }
};

module.exports = checkUuid;