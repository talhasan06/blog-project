import catchAsync from "../utils/catchAsync.js";
const validateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        try {
            // if everything all right next() ->
            await schema.parseAsync({
                body: req.body,
            });
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
export default validateRequest;
