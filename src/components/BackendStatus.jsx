import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BackendStatus = () => {
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const checkBackendStatus = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        setIsBackendAvailable(true);
        if (!isBackendAvailable) {
          toast.success('✅ Connexion au serveur rétablie !');
        }
      } else {
        setIsBackendAvailable(false);
      }
    } catch (error) {
      setIsBackendAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Vérification initiale
    checkBackendStatus();
    
    // Vérification périodique toutes les 30 secondes
    const interval = setInterval(checkBackendStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isBackendAvailable) {
    return null; // Ne rien afficher si le backend est disponible
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-2 text-center">
      <div className="flex items-center justify-center space-x-2">
        <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">
          ⚠️ Serveur backend non disponible - Veuillez démarrer le serveur sur le port 5000
        </span>
        <button
          onClick={checkBackendStatus}
          disabled={isChecking}
          className="ml-4 px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm transition-colors disabled:opacity-50"
        >
          {isChecking ? '🔄 Vérification...' : '🔄 Réessayer'}
        </button>
      </div>
    </div>
  );
};

export default BackendStatus;