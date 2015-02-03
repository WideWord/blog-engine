

module.exports.errorHandler = function(err, req, res, next) {
    if (err) {
        if (err.name == "ValidationError") {
            var emberError = {
                errors: {}
            };
            for (var field in err.errors) {
                emberError.errors[field] = [err.errors[field].message];
            }
            err = emberError;
        } else if (!err.errors) {
            err = {
                errors: "Internal server error"
            };
        }
        res.status(422).send(err);
    }
}
