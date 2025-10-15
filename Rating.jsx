import React from 'react';
import { StarIcon } from './Icons';

const Rating = ({ rate, count }) => (
    <div className="flex items-center">
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(rate) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
        <span className="text-gray-600 ml-2 text-sm">({count})</span>
    </div>
);

export default Rating;