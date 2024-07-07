const { Schema, model,models } = require("mongoose");

const PaytmentSchema =new Schema({
name:{type:String},
to_user:{type:String},
oid:{type:String},
message:{type:String},
amount:{type:Number},
done:{type:Boolean,default:false}
},{timestamps:true});
const Payment = models.payment || model("payment",PaytmentSchema)
export default Payment;