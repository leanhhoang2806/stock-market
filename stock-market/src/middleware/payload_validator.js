const { validationResult, body } = require('express-validator');

const validateWatchlistPayload = [
  body('userId').isUUID().notEmpty(),
  body('watchListName').isString().notEmpty().trim(),
  body('stockNames').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateWatchlistPayload = [
    body('watchListId').isUUID().notEmpty(),
    body('stockNames').isString().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];


module.exports = { 
    validateWatchlistPayload,
    validateUpdateWatchlistPayload
};
