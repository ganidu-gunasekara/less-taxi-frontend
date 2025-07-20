'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';

type HotelCardProps = {
  title: string;
  original_price: string;
  discounted_price: string;
  description: string;
  location: string;
  reviews: number;
  features: string[];
  already_purchased: number;
  deadline: string;
  image_url: string;
};

export default function HotelCard({
  title,
  original_price,
  discounted_price,
  description,
  location,
  reviews,
  features,
  already_purchased,
  deadline,
  image_url,
}: HotelCardProps) {

  const [countdown, setCountdown] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const distance = end - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const total = 20;
  const percentage = Math.min((already_purchased / total) * 100, 100);


  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl mx-auto">
      <div className="relative w-full md:w-[350px] aspect-[4/3] md:aspect-auto md:h-auto flex-shrink-0">
        <Image
          src={image_url}
          alt="Hotel"
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded">
          {title}
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col gap-2 w-full">
        <p className="text-lg md:text-xl font-bold text-blue-900">
          {description}
        </p>
        <p className="text-gray-700 text-sm mb-2">{location} • {reviews} Reviews</p>

        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <ul className="space-y-2 mb-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <HiCheck className="mt-1 text-green-600" />
                  <span className="text-sm text-black">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gray-300 h-2 rounded mb-2">
              <div
                className="bg-blue-800 h-2 rounded"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Already purchased: {already_purchased}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded font-extrabold text-sm">
                View Details
              </button>
              <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold text-sm">
                Book Now
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end text-right min-w-[180px] md:ml-auto">
            <div className="mb-2">
              <p className="text-black line-through text-sm md:text-base font-bold">{original_price}</p>
              <p className="text-red-600 font-extrabold text-xl md:text-2xl">{discounted_price}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              {[countdown.hours, countdown.minutes, countdown.seconds].map((val, i) => (
                <div key={i}>
                  <p className="bg-white border border-blue-950 text-blue-950 px-3 py-2 rounded-lg text-lg font-black shadow-sm">
                    {val}
                  </p>
                  <p className="text-xs text-blue-950 font-semibold">
                    {['Hours', 'Minutes', 'Seconds'][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
