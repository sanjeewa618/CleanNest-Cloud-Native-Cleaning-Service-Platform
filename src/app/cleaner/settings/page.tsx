'use client';

import React from 'react';
import { Settings, Bell, CreditCard, Shield, Save } from 'lucide-react';

export default function CleanerSettingsPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Settings</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Manage your app preferences, notifications, and payout methods.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        
        {/* Payout Methods */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} color="#15803d" /> Payout Methods
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '16px',
            border: '2px solid #16a34a',
            backgroundColor: '#f0fdf4',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '32px', backgroundColor: '#0f172a', borderRadius: '6px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
                VISA
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Chase Checking ending in 4920</div>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Default Payout Method</div>
              </div>
            </div>
            <button style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              Edit
            </button>
          </div>

          <button style={{ padding: '12px 24px', borderRadius: '12px', border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc', color: '#0f172a', fontWeight: 600, width: '100%', cursor: 'pointer' }}>
            + Add New Bank Account
          </button>
        </div>

        {/* Notifications */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#15803d" /> Notifications
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>New Job Requests</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Get notified when a new job matches your specialties.</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: '#16a34a', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Payout Alerts</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Get notified when a payout is sent to your bank.</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: '#16a34a', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Marketing & Promotions</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Receive tips on how to increase your earnings.</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: '#cbd5e1', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '2px', left: '2px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="#15803d" /> Security
          </h2>
          
          <button style={{ padding: '14px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer', marginBottom: '12px' }}>
            <span>Change Password</span>
            <span style={{ color: '#64748b' }}>&gt;</span>
          </button>

          <button style={{ padding: '14px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }}>
            <span>Two-Factor Authentication</span>
            <span style={{ color: '#64748b' }}>Off &gt;</span>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', backgroundColor: '#15803d', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            <Save size={18} /> Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}
