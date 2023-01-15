const {Schema,model} = require('mongoose')


const VideogamesSchema = new Schema({
    name:{type:String, required:true},
    url_image:{type:String, default:''},
    rating:{type:Number, default:1},
    status:{type:String, default:'Not Status'},
    comment:{type:String, default:''},
    position:{type:Number},
    idApi:{type:String},
    userId:{type:Schema.Types.ObjectId, ref:'Users'}
},
{
    timestamps:true
})


VideogamesSchema.set('toJSON',{
    transform:(document, returnObject) =>{
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.updatedAt
        delete returnObject.createdAt
    }
})



module.exports = model('Videogames', VideogamesSchema)