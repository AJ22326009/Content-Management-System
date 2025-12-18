const role= require('../models/Role');
//create a new role
const getAllRoles= async (req, res) => {
    try {
        const roles= await role.find();
        res.status(200).json({roles});

    } catch (error) {
        res.status(400).json({message: 'error fetching roles', error: error.message})
    }
}

const updateRolePermissions= async (req, res) => {
    try {
        const roleId= req.params.id;
        const {permissions}= req.body;
        const updatedRole= await role.findByIdAndUpdate(roleId, {permissions}, {new: true});
        if(!updatedRole){
            return res.status(404).json({message: 'role not found'});
        }

        res.status(200).json({message: 'role updated successfully', role: updatedRole});
    } catch (error) {
        res.status(400).json({message: 'error updating role', error: error.message});
    }
}


module.exports= {getAllRoles, updateRolePermissions};