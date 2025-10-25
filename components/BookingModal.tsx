import React, { useState, useCallback } from 'react';
import { Advocate } from '../types';
import { XIcon } from '../constants';

interface BookingModalProps {
  advocate: Advocate;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ advocate, onClose }) => {
  const [step, setStep] = useState(1); // 1: Schedule, 2: Payment, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [caseDescription, setCaseDescription] = useState<string>('');
  const [location, setLocation] = useState('USA');
  const [currency, setCurrency] = useState('USD');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [confirmationEmail, setConfirmationEmail] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };
  
  const handlePayment = () => {
    setIsPaying(true);
    // Mock payment processing
    setTimeout(() => {
      const newBookingId = `DGT-${Date.now().toString().slice(-6)}`;
      setBookingId(newBookingId);
      setStep(3);
      setIsPaying(false);
    }, 1500);
  };

  const handleSendEmail = () => {
      // Mock email sending
      console.log(`Sending confirmation for booking ${bookingId} to ${confirmationEmail}`);
      setIsEmailSent(true);
  };
  
  const getFormattedFee = useCallback(() => {
    const fee = 9.00;
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
        }).format(fee);
    } catch (e) {
        console.warn(`Could not format currency ${currency}, using fallback. Error:`, e);
        const currencySymbols: { [key: string]: string } = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' };
        const symbol = currencySymbols[currency] || currency;
        return `${symbol}${fee.toFixed(2)}`;
    }
  }, [currency]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close">
          <XIcon className="w-6 h-6" />
        </button>
        
        {step === 1 && (
          <div className="p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Book with {advocate.name}</h2>
            <p className="text-slate-500 mb-6">Select your preferences for the consultation.</p>
            
            <div className="space-y-4">
              <div className="flex space-x-4">
                  <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 block mb-1">Date</label>
                      <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                  </div>
                  <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 block mb-1">Time</label>
                      <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="">Select a time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                  </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700 block mb-1">Location</label>
                    <select value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="USA">USA</option>
                        <option value="CAN">Canada</option>
                        <option value="GBR">United Kingdom</option>
                        <option value="AUS">Australia</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700 block mb-1">Currency</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="AUD">AUD (A$)</option>
                    </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Reason for Consultation</label>
                <textarea
                  value={caseDescription}
                  onChange={e => setCaseDescription(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                  placeholder="Briefly describe your legal matter..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Attach Documents (Optional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-slate-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PDF, PNG, JPG, DOCX up to 10MB each</p>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="mt-2 text-sm text-slate-700 space-y-1">
                        {files.map((file, index) => (
                            <div key={index} className="flex justify-between items-center bg-slate-100 p-1.5 rounded">
                                <span className="truncate">{file.name}</span>
                                <button onClick={() => removeFile(file)} className="text-red-500 hover:text-red-700 ml-2" aria-label={`Remove ${file.name}`}>
                                  <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-800 text-sm">Cancellation Policy</h4>
                <p className="text-xs text-slate-500 mt-1">Appointments can be cancelled for a full refund up to 24 hours before the scheduled time. Cancellations within 24 hours are non-refundable.</p>
            </div>

            <div className="mt-4 flex items-start">
                <input
                    type="checkbox"
                    id="cancellation-agreement"
                    checked={hasAgreed}
                    onChange={e => setHasAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="cancellation-agreement" className="ml-2 text-sm text-slate-600">
                    I have read and agree to the cancellation policy.
                </label>
            </div>

            <p className="mt-4 text-xs text-slate-500">
                As we are just a service platform, we are not responsible for any loss. For more info, read our <a href="/privacy-policy" className="text-blue-600 hover:underline">privacy policy</a> and <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>.
            </p>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime || !caseDescription.trim() || !hasAgreed}
              className="mt-6 w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {step === 2 && (
            <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirm Payment</h2>
                <p className="text-slate-500 mb-4 text-sm">
                    You are booking a consultation with {advocate.name} for {selectedDate} at {selectedTime}.
                </p>
                
                <div className="space-y-2">
                    <div className="text-left bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-sm font-medium text-slate-700">Your Case Summary:</p>
                        <p className="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{caseDescription}</p>
                    </div>
                    {files.length > 0 && (
                        <div className="text-left bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-sm font-medium text-slate-700">Documents Attached:</p>
                            <p className="text-slate-600 text-sm mt-1">{files.length} file(s)</p>
                        </div>
                    )}
                </div>
                
                <div className="text-left mt-4">
                  <label htmlFor="signature" className="text-sm font-medium text-slate-700 block mb-1">
                      Digital Signature
                  </label>
                  <input
                      type="text"
                      id="signature"
                      value={signature}
                      onChange={e => setSignature(e.target.value)}
                      placeholder="Type your full name to sign"
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">By signing, you confirm the details and agree to the fee.</p>
                </div>

                <div className="bg-slate-100 p-4 rounded-xl my-6 text-center">
                    <p className="text-slate-600">Total Amount</p>
                    <p className="text-4xl font-extrabold text-slate-900">{getFormattedFee()}</p>
                </div>
                <button
                    onClick={handlePayment}
                    disabled={isPaying || !signature.trim()}
                    className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-transform hover:scale-105 shadow-lg disabled:bg-green-400 disabled:cursor-wait flex items-center justify-center"
                >
                    {isPaying ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Pay Now'
                    )}
                </button>
                 <button onClick={() => setStep(1)} disabled={isPaying} className="mt-2 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50">Go Back</button>
            </div>
        )}

        {step === 3 && (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                <p className="text-slate-500">Your appointment with {advocate.name} is scheduled for {selectedDate} at {selectedTime}.</p>
                
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-3 my-6">
                    <p className="text-sm text-slate-600">Your Booking ID</p>
                    <p className="text-lg font-bold text-slate-800 tracking-widest">{bookingId}</p>
                </div>

                <div className="text-left space-y-2 mb-6">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Get confirmation by email:</label>
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            id="email"
                            value={confirmationEmail}
                            onChange={(e) => setConfirmationEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-grow w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            disabled={isEmailSent}
                        />
                        <button
                            onClick={handleSendEmail}
                            disabled={!confirmationEmail || isEmailSent}
                            className="px-4 py-2 font-semibold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                           {isEmailSent ? 'Sent!' : 'Send'}
                        </button>
                    </div>
                </div>

                <button onClick={onClose} className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                    Close
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;