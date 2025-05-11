class GlobalError {
    constructor() {
        this.globalErrorHandler = this.globalErrorHandler.bind(this);
    }

    sendErrorDev(err, res) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    sendErrorProd(err, res) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    globalErrorHandler(err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";

        this.sendErrorDev(err, res);
    }
}

export default new GlobalError();
