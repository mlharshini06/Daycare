const db = require('../db');

// GET /api/notifications
const getNotificationSettings = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM notification_settings WHERE id = 1');
    
    if (rows.length === 0) {
      // If no settings exist yet in the database, return default false values
      return res.json({
        id: 1,
        new_registrations: false,
        center_approval_requests: false,
        payment_alerts: false,
        system_errors: false,
        user_reports: false,
        daily_digest: false
      });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({ error: 'Internal server error while fetching settings' });
  }
};

// PUT /api/notifications
const updateNotificationSettings = async (req, res) => {
  try {
    // Extract boolean values from request body with false as fallback
    const {
      new_registrations = false,
      center_approval_requests = false,
      payment_alerts = false,
      system_errors = false,
      user_reports = false,
      daily_digest = false
    } = req.body;

    // Use UPSERT (INSERT ... ON CONFLICT DO UPDATE) to either insert or update row with id = 1
    const query = `
      INSERT INTO notification_settings (
        id, new_registrations, center_approval_requests, payment_alerts, system_errors, user_reports, daily_digest
      ) VALUES (
        1, $1, $2, $3, $4, $5, $6
      ) ON CONFLICT (id) DO UPDATE SET 
        new_registrations = EXCLUDED.new_registrations,
        center_approval_requests = EXCLUDED.center_approval_requests,
        payment_alerts = EXCLUDED.payment_alerts,
        system_errors = EXCLUDED.system_errors,
        user_reports = EXCLUDED.user_reports,
        daily_digest = EXCLUDED.daily_digest
      RETURNING *;
    `;
    
    const values = [
      new_registrations,
      center_approval_requests,
      payment_alerts,
      system_errors,
      user_reports,
      daily_digest
    ];

    const { rows } = await db.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ error: 'Internal server error while updating settings' });
  }
};

module.exports = {
  getNotificationSettings,
  updateNotificationSettings
};
