import React from 'react';
import { User } from '../types';
import { XIcon } from '../constants';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const handleGoogleLogin = () => {
    // This is a mock login
    const mockUser: User = {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
    };
    onLoginSuccess(mockUser);
  };
  
  const handleMobileLogin = () => {
    // This is a mock login
    const mockUser: User = {
      name: 'Jane Doe',
      email: 'jane.d@example.com',
    };
    onLoginSuccess(mockUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close">
          <XIcon className="w-6 h-6"/>
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
        <p className="text-slate-500 mb-8">to book appointments and manage your account.</p>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.617-3.276-11.283-7.94l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.904,36.213,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            <span className="font-semibold text-slate-700">Sign in with Google</span>
          </button>
          
          <button
            onClick={handleMobileLogin}
            className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span className="font-semibold text-slate-700">Sign in with Mobile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;