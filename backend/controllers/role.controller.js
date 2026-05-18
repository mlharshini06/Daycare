const db = require('../db');

// GET /api/roles
const getAllRoles = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM user_roles ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    res.status(500).json({ error: 'Internal server error while fetching roles' });
  }
};

// PUT /api/roles/:id
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, permissions, status } = req.body;

    // Use COALESCE to only update the fields that are provided in the request body
    const query = `
      UPDATE user_roles
      SET 
        role_name = COALESCE($1, role_name),
        permissions = COALESCE($2, permissions),
        status = COALESCE($3, status)
      WHERE id = $4
      RETURNING *;
    `;
    
    // permissions is a JSONB column, pg library handles JSON objects automatically
    const values = [
      role_name !== undefined ? role_name : null, 
      permissions !== undefined ? permissions : null, 
      status !== undefined ? status : null, 
      id
    ];

    const { rows } = await db.query(query, values);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Internal server error while updating role' });
  }
};

module.exports = {
  getAllRoles,
  updateRole
};
