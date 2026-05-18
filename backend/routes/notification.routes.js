const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// Route to fetch settings
router.get('/', notificationController.getNotificationSettings);

// Route to update settings
router.put('/', notificationController.updateNotificationSettings);

module.exports = router;
