CREATE TABLE notification_settings (
    id SERIAL PRIMARY KEY,
    new_registrations BOOLEAN DEFAULT false,
    center_approval_requests BOOLEAN DEFAULT false,
    payment_alerts BOOLEAN DEFAULT false,
    system_errors BOOLEAN DEFAULT false,
    user_reports BOOLEAN DEFAULT false,
    daily_digest BOOLEAN DEFAULT false
);

CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}',
    status BOOLEAN DEFAULT true
);
