const errorWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next)
    } catch (err) {
        return res.status(err.statusCode || 500).json({ error: err.message })
    }
}

module.exports = errorWrapper 