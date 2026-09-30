'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { Users, Search, Mail, Phone, Calendar, MoreVertical } from 'lucide-react';

export default function AdminCustomersPage() {
  const { customers } = useCleanNest();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = (customers || []).filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '16px' }}>
            <Users size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Customers
            </h1>
            <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>
              Manage and view all registered platform customers.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search customers..."
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
      
      <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', width: '60px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=16a34a&color=fff`} 
                        alt={customer.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{customer.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569' }}>
                        <Mail size={14} color="#94a3b8" /> {customer.email}
                      </div>
                      {customer.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569' }}>
                          <Phone size={14} color="#94a3b8" /> {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ACTIVE
                    </span>
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
                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
