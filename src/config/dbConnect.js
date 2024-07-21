import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect(process.env.DB_CONECTION_STRING);
    return mongoose.connection;
};

export default conectaNaDatabase;