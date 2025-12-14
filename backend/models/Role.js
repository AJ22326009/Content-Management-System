const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        permissions:[{
            type: String,
            ref: 'Permission'
        }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.Schema('Role',roleSchema);