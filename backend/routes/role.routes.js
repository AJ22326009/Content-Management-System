const express = require('express');
const router = express.Router();

const {getAllRoles, updateRolePermissions} = require('../controllers/role.controller');
const authorize = require('../middleware/authorize');

//get all roles
router.get('/',
    authorize('view_roles'),
    getAllRoles
)


//update role permissions
router.put('/:id/permissions',
    authorize('edit_role_permissions'),
    updateRolePermissions
);

module.exports = router;