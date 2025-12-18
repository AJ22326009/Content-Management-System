const permission= require('../models/Permission');

//get all permissions
const getAllPermissions= async (req, res) => {
    try {
        const permissions= await permission.find();
        res.status(200).json({permissions});
    } catch (error) {
        res.status(400).json({message: 'error fetching permissions', error: error.message})
    }
}

module.exports= {getAllPermissions};