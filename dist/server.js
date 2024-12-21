import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";
let server;
async function main() {
    try {
        await mongoose.connect(config.database_url);
        server = app.listen(config.port, () => {
            console.log("App running ....");
        });
    }
    catch (err) {
        console.log(err);
    }
}
main();
process.on("unhandledRejection", () => {
    console.log(`unhandledRejection is detected, shutting down`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", () => {
    console.log(`unhandledRejection is detected, shutting down`);
    process.exit(1);
});
