const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// Route to fetch all roles
router.get('/', roleController.getAllRoles);

// Route to update a specific role by id
router.put('/:id', roleController.updateRole);

module.exports = router;
