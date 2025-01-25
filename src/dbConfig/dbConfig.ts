import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the MONGODB_URL environment variable.
 * If the connection is successful, logs "Database connected" to the console.
 * If the connection fails, logs the error to the console.
 */
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Database connected");
        })

        connection.on("error", (error) => {
            console.log("Mongoose connection error" + error);
            process.exit(1);
        });

        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
    }
}