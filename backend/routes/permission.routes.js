const express = require('express');
const router = express.Router();
const {getAllPermissions} = require('../controllers/permission.controller');

const authorize = require('../middleware/authorize');

//get all permissions
router.get('/',
    authorize('view_permissions'),
    getAllPermissions
);

module.exports = router;