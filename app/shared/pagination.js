class PaginationHelper {
    constructor(query) {
        this.limit = query.limit ? parseInt(query.limit) : 10;
        this.skip = (query.page && this.limit) ? (parseInt(query.page) - 1) * this.limit : 1;
        this.sort = {
            "createdAt": 1
        };
    }
}

module.exports = PaginationHelper;