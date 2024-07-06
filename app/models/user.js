const { Schema, model,models } = require("mongoose");

const userSchema=Schema({
    name:{type:String},
    email:{type:String},
    username:{type:String},
    profile_picture:{type:String},
    cover_picture:{type:String},
    r_id:{type:String},
    r_secret:{type:String}
},{timestamp:true})

const User = models.user || model("user",userSchema);
export default User;