const HttpStatus = {
    OK: { code: 200, message: 'OK' },
    CREATED: { code: 201, message: 'Created' },
    NOT_FOUND: { code: 404, message: 'Resource not found' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
};

const handleResult = (handler) => async (req, res, next) => {
    try {
        const result = await handler(req, res, next);
        
        if (result === null) {
            const errorMessage = req.errorMsg || HttpStatus.NOT_FOUND.message;
            res.status(HttpStatus.NOT_FOUND.code).json({ error: errorMessage });
        } else {
            res.json(result);
        }
    } catch (error) {
        const errorMessage = error.message || HttpStatus.INTERNAL_SERVER_ERROR.message;
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({ error: errorMessage });
    }
};

module.exports = {
    handleResult,
};
