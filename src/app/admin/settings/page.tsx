'use client';

import React from 'react';
import { Settings, Shield, Bell, CreditCard, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '16px' }}>
          <Settings size={28} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Platform Settings
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>
            Configure system rules, pricing, and integrations.
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* Left Nav */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fff', border: '1px solid #16a34a', borderRadius: '16px', color: '#16a34a', fontWeight: 700, cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <Settings size={20} /> General Info
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'transparent', border: 'none', borderRadius: '16px', color: '#64748b', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
            <Shield size={20} /> Security
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'transparent', border: 'none', borderRadius: '16px', color: '#64748b', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
            <CreditCard size={20} /> Pricing & Payouts
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'transparent', border: 'none', borderRadius: '16px', color: '#64748b', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
            <Bell size={20} /> Notifications
          </button>
        </div>

        {/* Form Content */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 24px 0', color: '#0f172a' }}>General Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Platform Name</label>
              <input type="text" defaultValue="CleanNest" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Support Email</label>
              <input type="email" defaultValue="support@cleannest.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Platform Fee (%)</label>
                <input type="number" defaultValue="20" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Currency</label>
                <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a', backgroundColor: '#fff' }}>
                  <option>LKR (Rs.)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(22, 163, 74, 0.2)' }}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
