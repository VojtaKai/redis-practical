function errorMiddleware (err, req, res, next) {
    if (err) {
        res.status(500).json({
            error: {
                message: err?.message ?? "Internal error"
            }
        })
    }
}

module.exports = {
    errorMiddleware
}