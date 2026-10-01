'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { Briefcase, Search, Mail, Phone, Star, ShieldCheck, MoreVertical, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function AdminProvidersPage() {
  const { cleaners, updateCleanerStatus } = useCleanNest();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = (cleaners || []).filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = filteredProviders.filter((c) => c.status === 'PENDING');
  const otherProviders = filteredProviders.filter((c) => c.status !== 'PENDING');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '16px' }}>
            <Briefcase size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Service Providers
            </h1>
            <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>
              Manage vetted cleaners and service professionals.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      {/* PENDING REQUESTS SECTION */}
      {pendingRequests.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertCircle size={20} color="#d97706" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>New Registration Requests ({pendingRequests.length})</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {pendingRequests.map(req => (
              <div key={req.id} style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #fcd34d', padding: '20px', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: '#f59e0b' }}></div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img 
                    src={req.avatar || `https://ui-avatars.com/api/?name=${req.name}&background=fef3c7&color=d97706`} 
                    alt={req.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>{req.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginTop: '4px' }}>
                      NEW REQUEST
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#475569' }}>
                    <Briefcase size={16} color="#94a3b8" /> <strong>Category:</strong> {req.role || 'N/A'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#475569' }}>
                    <Mail size={16} color="#94a3b8" /> <strong>Email:</strong> {req.email || 'N/A'}
                  </div>
                  {req.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#475569' }}>
                      <Phone size={16} color="#94a3b8" /> <strong>Phone:</strong> {req.phone}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => updateCleanerStatus(req.id, 'ACTIVE')}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 4px rgba(22, 163, 74, 0.2)' }}
                  >
                    <CheckCircle2 size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => updateCleanerStatus(req.id, 'REJECTED')}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', backgroundColor: '#fff', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', width: '60px' }}></th>
            </tr>
          </thead>
          <tbody>
            {otherProviders.length > 0 ? (
              otherProviders.map((provider) => (
                <tr key={provider.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={provider.avatar || `https://ui-avatars.com/api/?name=${provider.name}&background=1e293b&color=fff`} 
                        alt={provider.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {provider.name} <ShieldCheck size={14} color="#16a34a" />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {provider.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569' }}>
                        <Mail size={14} color="#94a3b8" /> {provider.email || 'N/A'}
                      </div>
                      {provider.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569' }}>
                          <Phone size={14} color="#94a3b8" /> {provider.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>
                      {provider.role || (provider.specialties && provider.specialties.length > 0 ? provider.specialties[0] : 'General')}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#0f172a' }}>
                      <Star size={16} color="#f59e0b" fill="#f59e0b" /> {provider.rating ? provider.rating.toFixed(1) : '5.0'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {provider.jobsCompleted || 0} jobs
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {provider.status === 'ACTIVE' || provider.status === 'active' ? (
                      <span style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        ACTIVE
                      </span>
                    ) : provider.status === 'REJECTED' ? (
                      <span style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        REJECTED
                      </span>
                    ) : provider.status === 'SUSPENDED' || provider.status === 'suspended' ? (
                      <span style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        SUSPENDED
                      </span>
                    ) : (
                      <span style={{ padding: '4px 10px', backgroundColor: '#f1f5f9', color: '#64748b', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {provider.status?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  No active or suspended providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
