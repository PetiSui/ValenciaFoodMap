import mongoose, {mongo} from "mongoose";

global.mongoose = {
    conn: null,
    promise: null
}

export async function initMongoose(){
    // if(mongoose.connection.readyState === 1){
    //     return mongoose.connection.asPromise();
    // }

    // return await mongoose.connect(process.env.DB_URI?.replace("<password>", process.env.DB_PASS!)!)
    try{
        if(global.mongoose && mongoose.conn){
            console.log("DB Connection already established.");
            return global.mongoose.conn;
        }else{
            const promise = mongoose.connect(process.env.DB_URI?.replace("<username>", process.env.DB_USER).replace("<password>", process.env.DB_PASS), {autoIndex: true});
    
            global.mongoose = {
                conn: await promise,
                promise
            }
    
            console.log("DB Connection established!");
            return await promise;
        }
    } catch (error){
        console.log("Error connecting to database: ", error);
        throw new Error("DB connection failed");
    }
}

export const disconnect = () => {
    if (!global.mongoose.conn) {
      return;
    }
    global.mongoose.conn = null;
    mongoose.disconnect();
  };