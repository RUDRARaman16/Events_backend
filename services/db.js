const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/Reminder',{//connection string
   
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
const User=mongoose.model('User',{
    userID: Number,
    username:String,
    password :String,
    events  :Array


})
module.exports={
    User
}
