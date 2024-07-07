const { Schema, model,models } = require("mongoose");

const userSchema=Schema({
    name:{type:String,default:""},
    email:{type:String},
    username:{type:String,default:""},
    profile_picture:{type:String,default:""},
    cover_picture:{type:String,default:""},
    r_id:{type:String,default:""},
    r_secret:{type:String,default:""}
},{timestamp:true})

const User = models.user || model("user",userSchema);
export default User;