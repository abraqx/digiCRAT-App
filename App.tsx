import React, { useState, useCallback, useEffect } from 'react';
import { Advocate, User } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AdvocateCard from './components/AdvocateCard';
import AdvocateProfile from './components/AdvocateProfile';
import LoginModal from './components/LoginModal';
import BookingModal from './components/BookingModal';
import EngagingLoader from './components/EngagingLoader';
import { findAdvocates } from './services/geminiService';
import { NoResultsIcon } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(null);
  const [view, setView] = useState<'search' | 'profile'>('search');
  
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadInitialAdvocates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await findAdvocates('various common legal specialties');
        if (results.length > 0) {
            setAdvocates(results);
        } else {
            setError("Could not load example advocates. Please use the search bar.");
        }
      } catch (err) {
        setError('Failed to load initial advocates. Please try searching.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialAdvocates();
  }, []);

  const handleSearch = useCallback(async (query: string, specialty: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setAdvocates([]);

    let promptParts = [];
    if (specialty) promptParts.push(`specializing in ${specialty}`);
    if (location) promptParts.push(`located in or near ${location}`);
    if (query) promptParts.push(`who can help with cases related to "${query}"`);

    let searchPrompt;
    if (promptParts.length > 0) {
      searchPrompt = promptParts.join(' and ');
    } else {
      searchPrompt = 'various common legal specialties';
    }

    try {
      const results = await findAdvocates(searchPrompt);
      setAdvocates(results);
    } catch (err) {
      setError('Failed to fetch advocates. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectAdvocate = (advocate: Advocate) => {
    setSelectedAdvocate(advocate);
    setView('profile');
  };

  const handleBackToSearch = () => {
    setSelectedAdvocate(null);
    setView('search');
  };
  
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setLoginModalOpen(false);
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  const openBookingModal = () => {
    if (user) {
      setBookingModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Header 
        user={user} 
        onLoginClick={() => setLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      <main className="container mx-auto px-4 py-8 md:py-12 transition-all duration-300">
        {view === 'search' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-2">Find Your Legal Expert</h1>
            <p className="text-center text-slate-600 mb-8 text-lg">Search for top-rated advocates specialized in your area of need.</p>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            <div className="mt-12">
              {isLoading && <EngagingLoader />}
              {error && <p className="text-center text-red-500">{error}</p>}
              
              {!isLoading && !error && hasSearched && advocates.length === 0 && (
                <div className="text-center text-slate-500 mt-16 flex flex-col items-center">
                  <NoResultsIcon />
                  <h3 className="text-xl font-semibold mt-4">No Advocates Found</h3>
                  <p>Try refining your search for a different specialty.</p>
                </div>
              )}
              
              {!isLoading && advocates.length > 0 && (
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">{hasSearched ? 'Search Results' : 'Featured Advocates'}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advocates.map((advocate) => (
                  <AdvocateCard key={advocate.id} advocate={advocate} onSelect={handleSelectAdvocate} />
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'profile' && selectedAdvocate && (
          <AdvocateProfile 
            advocate={selectedAdvocate} 
            onBack={handleBackToSearch}
            onBookAppointment={openBookingModal}
          />
        )}
      </main>

      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setLoginModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {isBookingModalOpen && selectedAdvocate && (
        <BookingModal
          advocate={selectedAdvocate}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;