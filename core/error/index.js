/**
 *
 *
 * @class ServerError
 * @extends {Error}
 */
class ServerError extends Error {
    /**
     *Creates an instance of ServerError.
     * @param {string} message
     * @param {number} [status=500]
     * @param {*} [errors={}]
     * @memberof ServerError
     */
    constructor(message, status = 500, errors = {}) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

module.exports = {
    ServerError
};