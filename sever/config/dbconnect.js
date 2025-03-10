const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn.connection.readyState === 1) {
            console.log('Db connected successfully');
        }else{
            console.log('Db connection failed');
        }
    } catch (error) {
        console.log('Db connect error: ', error);
        throw new Error(error)
    }
};


module.exports = dbConnect;