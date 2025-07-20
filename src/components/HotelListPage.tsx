'use client';

import { useEffect, useState } from 'react';
import HotelCard from '@/components/HotelCard';

export default function HotelListPage() {
  const [hotels, setHotels] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      const query = locationFilter ? `?location=${locationFilter}` : '';
      const res = await fetch(`http://localhost:4000/hotel${query}`);
      const data = await res.json();
      setHotels(data);
    };

    fetchHotels();
  }, [locationFilter]);

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setLocationFilter('')}
          className="bg-blue-950 text-white font-bold px-6 py-3 rounded shadow hover:bg-yellow-600 transition"
        >
          ALL DEALS
        </button>
        <button
          onClick={() => setLocationFilter('KANDY')}
          className="bg-blue-950 text-white font-bold px-6 py-3 rounded shadow hover:bg-yellow-600 transition"
        >
          KANDY DEALS
        </button>
        <button
          onClick={() => setLocationFilter('COLOMBO')}
          className="bg-blue-950 text-white font-bold px-6 py-3 rounded shadow hover:bg-yellow-600 transition"
        >
          COLOMBO DEALS
        </button>
      </div>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-500">No deals available.</p>
      ) : (
        hotels.map((hotel: any, i: number) => (
          <HotelCard key={i} {...hotel} />
        ))
      )}
    </div>
  );
}
