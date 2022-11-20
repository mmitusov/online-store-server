//Let's create error handler
class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    //Creating static error functions (we can add here whatever we want)
    static badRequest(message) {
        return new ApiError(404, message)
    }
    static enternal(message) {
        return new ApiError(500, message)
    }
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError