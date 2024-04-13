class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = "",
    ){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.success = false;
        this.message = message;
        this.data = null
        
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }

    }
}

export default ApiError;