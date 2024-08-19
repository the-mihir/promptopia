const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;
const uri = process.env.MONGODB_URI;


export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {


        await mongoose.connect(uri, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB Connected');
    } catch (e) {
        console.log('MongoDB connection error:', e);
    }
};
