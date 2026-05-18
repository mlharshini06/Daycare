import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  Bell,
  Shield,
  CreditCard,
  CheckCircle,
  Lock,
  Save,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [rules, setRules] = useState({
    new_registrations: false,
    center_approval_requests: false,
    payment_alerts: false,
    system_errors: true,
    user_reports: false,
    daily_digest: false,
  });

  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    let timer;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 2800);
    }

    return () => clearTimeout(timer);
  }, [showToast]);
  const toggleRule = (key) => {
    if (key === 'system_errors') return;

    setRules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSaveSettings = async () => {
    try {
      await fetch("http://localhost:5000/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rules),
      });

      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0">
        <div>
          {/* Logo Section */}
          <div className="p-6 flex items-center gap-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-[#FFB073] rounded-lg flex items-center justify-center">
              <span className="text-2xl">👶</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight tracking-tight text-lg">LittleSteps</h1>
              <p className="text-[11px] text-gray-500 mt-0.5">System Administrator</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 space-y-1">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavItem icon={<Building2 size={18} />} label="Centers" />
            <NavItem icon={<Users size={18} />} label="Users" />
            <NavItem icon={<FileText size={18} />} label="Reports" />
            <NavItem icon={<Settings size={18} />} label="Settings" active />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-[22px] font-bold text-slate-800">Settings</h2>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-[15px] h-[15px] bg-[#f97316] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#f97316] rounded-full flex items-center justify-center text-white font-semibold shadow-sm text-sm">
                RK
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 text-sm leading-tight">Rajesh Kumar</span>
                <span className="text-gray-500 text-xs">System Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-6xl w-full">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-slate-800 mb-1.5">Admin Settings</h1>
            <p className="text-gray-500 text-[15px]">Configure platform-wide settings and preferences</p>
          </div>

          <div className="flex items-start gap-6">
            {/* Settings Categories (Left Column) */}
            <div className="w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
              <CategoryItem
                icon={<Bell size={18} />}
                label="Platform Notifications"
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <CategoryItem
                icon={<Shield size={18} />}
                label="User Access Control"
                active={activeTab === 'accessControl'}
                onClick={() => setActiveTab('accessControl')}
              />
              <CategoryItem
                icon={<CreditCard size={18} />}
                label="Payment Configuration"
                active={activeTab === 'payment'}
                onClick={() => setActiveTab('payment')}
              />
              <CategoryItem
                icon={<CheckCircle size={18} />}
                label="Verification Workflow"
                active={activeTab === 'verification'}
                onClick={() => setActiveTab('verification')}
              />
              <CategoryItem
                icon={<Lock size={18} />}
                label="Security & Logs"
                active={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              />
            </div>

            {/* Settings Details (Right Column) */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {activeTab === 'notifications' && (
                <>
                  <h3 className="font-semibold text-slate-800 mb-6 text-base">Platform Notification Rules</h3>

                  <div className="space-y-4">
                    <ToggleRow
                      title="New Registrations"
                      description="Get notified when new users register"
                      isOn={rules.new_registrations}
                      onToggle={() => toggleRule('new_registrations')}
                    />
                    <ToggleRow
                      title="Center Approval Requests"
                      description="Alerts for daycare center approvals"
                      isOn={rules.center_approval_requests}
                      onToggle={() => toggleRule('center_approval_requests')}
                    />
                    <ToggleRow
                      title="Payment Alerts"
                      description="Notifications for payment transactions"
                      isOn={rules.payment_alerts}
                      onToggle={() => toggleRule('payment_alerts')}
                    />
                    <ToggleRow
                      title="System Errors"
                      description="Critical system error alerts (always enabled)"
                      isOn={rules.system_errors}
                      onToggle={() => toggleRule('system_errors')}
                      disabled
                    />
                    <ToggleRow
                      title="User Reports"
                      description="Alerts for user-reported issues"
                      isOn={rules.user_reports}
                      onToggle={() => toggleRule('user_reports')}
                    />
                    <ToggleRow
                      title="Daily Digest"
                      description="Daily summary of platform activity"
                      isOn={rules.daily_digest}
                      onToggle={() => toggleRule('daily_digest')}
                    />
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSaveSettings}
                      className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                      <Save size={18} />
                      Save Settings
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'accessControl' && (
                <>
                  <h3 className="font-semibold text-slate-800 text-[15px] mb-4">User Role & Access Control</h3>
                  <h4 className="font-semibold text-slate-800 text-[15px] mb-4">Role Permissions</h4>

                  <div className="space-y-4">
                    {/* Parent Role */}
                    <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-800 text-[14.5px]">Parent Role</h4>
                        <span className="bg-[#68D391] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-gray-400 text-[13px] mb-4">Access to child information and activities</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> View child activities
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Access CCTV feeds
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Chat with staff
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Make payments
                        </li>
                      </ul>
                    </div>

                    {/* Staff Role */}
                    <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-800 text-[14.5px]">Staff Role</h4>
                        <span className="bg-[#68D391] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-gray-400 text-[13px] mb-4">Access to manage children and activities</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Mark attendance
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Upload activities
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Chat with parents
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#68D391]" /> Upload photos
                        </li>
                      </ul>
                    </div>

                    {/* Admin Role */}
                    <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-800 text-[14.5px]">Admin Role</h4>
                        <span className="bg-[#f97316] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Full Access</span>
                      </div>
                      <p className="text-gray-400 text-[13px] mb-4">Full platform access and control</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#f97316]" /> Manage all users
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#f97316]" /> Approve daycare centers
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#f97316]" /> View analytics and reports
                        </li>
                        <li className="flex items-center gap-2 text-[13px] text-gray-500">
                          <CheckCircle size={14} className="text-[#f97316]" /> Configure platform settings
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-slate-700 text-[13px] font-semibold rounded-xl border border-gray-200 transition-colors shadow-sm">
                      Manage Custom Roles
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed right-6 bottom-20 z-50 max-w-sm w-full bg-white border border-slate-200/70 shadow-lg rounded-2xl overflow-hidden transition-opacity duration-300">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-slate-900 font-semibold text-sm">Notification settings saved!</p>
              <p className="text-slate-500 text-sm">Your changes have been saved successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 w-9 h-9 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors">
        <HelpCircle size={20} />
      </button>
    </div>
  );
}

// Components

function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${active
          ? 'bg-[#f97316] text-white shadow-md shadow-orange-500/20'
          : 'text-gray-600 hover:bg-orange-50 hover:text-[#f97316]'
        }`}
    >
      <div className={active ? 'text-white' : 'text-gray-400'}>
        {icon}
      </div>
      {label}
    </a>
  );
}

function CategoryItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors mb-1 last:mb-0 ${active
          ? 'bg-[#f88f4c] text-white shadow-sm'
          : 'text-slate-700 hover:bg-orange-50'
        }`}
    >
      <div className={active ? 'text-white' : 'text-slate-500'}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function ToggleRow({ title, description, isOn, onToggle, disabled }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors shadow-sm bg-white">
      <div>
        <h4 className="font-semibold text-slate-800 text-[14.5px]">{title}</h4>
        <p className="text-gray-400 text-[13px] mt-0.5">{description}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`w-11 h-6 rounded-full relative transition-colors focus:outline-none shrink-0 ${isOn
            ? (disabled ? 'bg-[#f8b688] cursor-not-allowed' : 'bg-[#f97316]')
            : 'bg-gray-200'
          }`}
      >
        <span
          className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform transform shadow-sm ${isOn ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
      </button>
    </div>
  );
}
