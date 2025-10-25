
import React from 'react';
import { StarIcon } from '../constants';

interface StarRatingProps {
  rating: number; // A number from 0 to 5
  size?: 'small' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'small' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const starSizeClass = size === 'large' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className={`${starSizeClass} text-yellow-400 fill-current`} />
      ))}
      {halfStar && (
         <div className="relative">
             <StarIcon className={`${starSizeClass} text-yellow-400 fill-current`} style={{ clipPath: 'inset(0 50% 0 0)' }} />
             <StarIcon className={`${starSizeClass} text-slate-300 fill-current absolute top-0 left-0`} style={{ clipPath: 'inset(0 0 0 50%)' }} />
         </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className={`${starSizeClass} text-slate-300 fill-current`} />
      ))}
    </div>
  );
};

export default StarRating;
