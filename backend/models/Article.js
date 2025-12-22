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
        imageUrl:{
            type: String
        },
        isPublished:{
            type: Boolean,
            default: false
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Article', articleShema)