const {
    ServerError
} = require("../../../core/error");

module.exports = controller = (service) => async (req, res, next) => {
    const {
        error,
        status,
        message,
        meta,
        data,
        downloadFile
    } = await service(
        req
    );
    if (error) return next(new ServerError(error, status));
    if (downloadFile) return res.download(downloadFile);
    return res.json({
        message,
        meta,
        data
    });
};