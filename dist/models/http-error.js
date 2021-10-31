class HttpError extends Error {
    constructor(message, code) {
        super(message); // add a "message" property
        this.code = code; // add a "code" property
    }
}
export default HttpError;
//# sourceMappingURL=http-error.js.map