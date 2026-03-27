import mongoose from 'mongoose'



const connectDB = async () => {
    try {
     const  conn = await mongoose.connect(process.env.MONGODB_URI,
            {
                dbName: process.env.DB_NAME
            })

        console.log(`mongoDB Connected ${conn.connection.host} - Database name is ${conn.connection.name}` );

    } catch (error) {
        console.log(`MongoDB Connection Error ${error.message} `);
        process.exit(1)       
    }
}
export default connectDB