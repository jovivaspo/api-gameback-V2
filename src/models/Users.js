const {Schema,model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required: true},
    videogames:[{
        type:Schema.Types.ObjectId,
        ref:'Videogames'
    }]

},
{
    timestamps:true
})


UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.set('toJSON',{
    transform:(document, returnObject) =>{
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.password
        delete returnObject.updatedAt
        delete returnObject.createdAt
    }
})


module.exports = model('Users', UserSchema)