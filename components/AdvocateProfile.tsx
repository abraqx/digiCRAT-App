import React from 'react';
import { Advocate } from '../types';
import { ChevronLeftIcon, MapPinIcon, BriefcaseIcon, ShieldCheckIcon, TrophyIcon } from '../constants';
import StarRating from './StarRating';

interface AdvocateProfileProps {
  advocate: Advocate;
  onBack: () => void;
  onBookAppointment: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-slate-100 p-4 rounded-xl flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full text-blue-600">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-lg font-bold text-slate-900">{value}</p>
        </div>
    </div>
);


const AdvocateProfile: React.FC<AdvocateProfileProps> = ({ advocate, onBack, onBookAppointment }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const placeholderSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-slate-300">
        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
      </svg>
    `;
    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(placeholderSvg)}`;
    e.currentTarget.classList.add('bg-slate-100');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6">
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to Search Results
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
                <img 
                    src={advocate.profileImageUrl} 
                    alt={advocate.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md flex-shrink-0" 
                    onError={handleImageError}
                />
                <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                    <h1 className="text-4xl font-extrabold text-slate-900">{advocate.name}</h1>
                    <p className="text-xl font-medium text-blue-600 mt-1">{advocate.specialty}</p>
                     <div className="mt-2 flex items-center space-x-2 text-slate-500 justify-center md:justify-start">
                        <MapPinIcon className="w-5 h-5" />
                        <span>{advocate.location}</span>
                    </div>
                    <div className="mt-4 flex justify-center md:justify-start">
                       <StarRating rating={advocate.trustworthinessScore / 20} size="large" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <StatCard icon={<BriefcaseIcon className="w-6 h-6"/>} label="Experience" value={`${advocate.experienceYears} years`} />
                <StatCard icon={<TrophyIcon className="w-6 h-6"/>} label="Cases Won" value={advocate.casesWon.toLocaleString()} />
                <StatCard icon={<ShieldCheckIcon className="w-6 h-6"/>} label="Trust Score" value={`${advocate.trustworthinessScore}/100`} />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">About {advocate.name.split(' ')[0]}</h2>
                <p className="text-slate-600 leading-relaxed">{advocate.bio}</p>
            </div>
        </div>
        <div className="bg-slate-50 px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
            <div>
                <p className="text-sm text-slate-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-slate-900">$9.00</p>
            </div>
            <button
                onClick={onBookAppointment} 
                className="mt-4 sm:mt-0 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-transform hover:scale-105 shadow-lg"
            >
                Book Appointment
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdvocateProfile;