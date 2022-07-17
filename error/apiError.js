//Let's create error handler
class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    //Creating static function
    static badRequest(message) {
        
    }
    
}