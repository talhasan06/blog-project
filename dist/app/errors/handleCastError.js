const handleCastError = (err) => {
    return {
        statusCode: 400,
        status: "error",
        message: "Invalid ID",
        errorDetails: [
            {
                path: err.path,
                message: "Invalid ID format",
            },
        ],
    };
};
export default handleCastError;
