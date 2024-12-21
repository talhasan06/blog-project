const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractedMessage} is already exists`,
        },
    ];
    return {
        statusCode: 400,
        message: "Invalid ID",
        errorSources,
    };
};
export default handleDuplicateError;
