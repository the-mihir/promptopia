const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {

        const URI = process.env.MONGODB_URI
        await mongoose.connect(URI, {
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
