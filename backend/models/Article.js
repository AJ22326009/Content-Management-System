const mongoose= require('mongoose');

const articleShema= new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        body:{
            type: String,
            required: true
        },
        image:{
            type: String
        },
        isPublished:{
            type: Boolean,
            default: false
        },
        author:{
            type: String,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.Schema('Article', articleShema)