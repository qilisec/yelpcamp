class ExpressErrors extends Error {
    constructor(message, statuscode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;