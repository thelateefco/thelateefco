// components/donation/DonationStats.tsx
"use client";

import { useState, useEffect } from 'react';
import { Heart, Users, IndianRupee } from 'lucide-react';

interface DonationStats {
  totalAmount: number;
  donorCount: number;
  totalDonations: number;
}

export default function DonationStats() {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/donation-stats');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalAmount: data.totalAmount || 0,
          donorCount: data.donorCount || 0,
          totalDonations: data.totalDonations || 0,
        });
      } else {
        setError('Failed to load donation stats');
      }
    } catch (err) {
      setError('Failed to load donation stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-6 text-sm">
        <div className="animate-pulse h-4 w-20 bg-[#E8E8EC] rounded"></div>
        <div className="animate-pulse h-4 w-16 bg-[#E8E8EC] rounded"></div>
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(stats.totalAmount);

  return (
    <div className="flex items-center gap-4 md:gap-6 text-sm">
      <div className="flex items-center gap-1.5">
        <IndianRupee className="w-3.5 h-3.5 text-[#B91C1C]" />
        <span className="font-medium text-[#1A1A1A]">{formattedAmount}</span>
        <span className="text-[#8A8A8A] text-xs">raised</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5 text-[#4A4A4A]" />
        <span className="font-medium text-[#1A1A1A]">{stats.donorCount}</span>
        <span className="text-[#8A8A8A] text-xs">donors</span>
      </div>
    </div>
  );
}