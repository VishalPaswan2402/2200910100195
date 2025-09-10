import mongoose from "mongoose";
const Schema =mongoose.Schema;

const urlData =new Schema({
    originalUrl :{
        type:String,
        required:true
    },
    shortUrl :{
        type :String
    }
    // time:{
    //     type: Date, 
    //     default: () => new Date(Date.now() + 60 * 60 * 1000),
    //     index: { expires: 3600 }
    // }
})

const urlShort = mongoose.model("urlShort", urlData);
export default urlShort;