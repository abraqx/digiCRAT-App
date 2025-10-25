import React from 'react';
import { Advocate } from '../types';
import { MapPinIcon, BriefcaseIcon } from '../constants';
import StarRating from './StarRating';

interface AdvocateCardProps {
  advocate: Advocate;
  onSelect: (advocate: Advocate) => void;
}

const AdvocateCard: React.FC<AdvocateCardProps> = ({ advocate, onSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // A simple, elegant SVG placeholder for a user avatar
    const placeholderSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-300">
        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
      </svg>
    `;
    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(placeholderSvg)}`;
    e.currentTarget.classList.add('bg-slate-100');
  };

  return (
    <div 
      className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(advocate)}
    >
      <div className="flex items-start space-x-4">
        <img 
          src={advocate.profileImageUrl} 
          alt={advocate.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-slate-100" 
          onError={handleImageError}
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">{advocate.name}</h3>
          <p className="text-blue-600 font-medium">{advocate.specialty}</p>
          <div className="mt-2 flex items-center space-x-4 text-slate-500 text-sm">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1.5" />
              <span>{advocate.location}</span>
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-1.5" />
              <span>{advocate.experienceYears} years</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Trustworthiness</p>
          <StarRating rating={advocate.trustworthinessScore / 20} />
        </div>
        <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default AdvocateCard;