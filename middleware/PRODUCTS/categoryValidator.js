const { body, validationResult } = require('express-validator');

const validateCategory = [
    body('male').notEmpty().withMessage('Male field is required'),
    body('female').notEmpty().withMessage('Female field is required'),
    body('bags').notEmpty().withMessage('Bags field is required'),
    body('hats').notEmpty().withMessage('Hats field is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCategory };
