import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Encrypt the owner code to make it harder to extract from source code
// This is a simple obfuscation, but better than plain text
const encryptCode = (code) => {
  return btoa(code.split('').map((char, i) => 
    String.fromCharCode(char.charCodeAt(0) + (i % 5))
  ).join(''));
};

const decryptCode = (hash) => {
  try {
    const decoded = atob(hash);
    return decoded.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) - (i % 5))
    ).join('');
  } catch {
    return '';
  }
};

// Encrypted owner code
const OWNER_SECRET_HASH = encryptCode('wessam2025');

export const AuthProvider = ({ children }) => {
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);

  useEffect(() => {
    // Check if owner mode is active from localStorage
    const encryptedOwnerMode = localStorage.getItem('ownerMode');
    const encryptedControls = localStorage.getItem('adminControls');
    
    if (encryptedOwnerMode) {
      try {
        // Decrypt the owner mode data
        const ownerData = JSON.parse(decryptCode(encryptedOwnerMode));
        
        // Check if the session is still valid
        if (ownerData.active && ownerData.expiry > Date.now()) {
          setIsOwnerMode(true);
          
          // Also restore admin controls state if available
          if (encryptedControls) {
            try {
              const controlsData = JSON.parse(decryptCode(encryptedControls));
              if (controlsData.state === true) {
                setShowAdminControls(true);
              }
            } catch (controlsError) {
              console.error('Error parsing admin controls:', controlsError);
              localStorage.removeItem('adminControls');
            }
          }
        } else {
          // Session expired, clean up
          localStorage.removeItem('ownerMode');
          localStorage.removeItem('adminControls');
        }
      } catch (error) {
        // Invalid data, clear it
        console.error('Error parsing owner data:', error);
        localStorage.removeItem('ownerMode');
      }
    }
  }, []);

  const activateOwnerMode = (secretCode) => {
    // Compare the entered code with the decrypted hash
    if (secretCode === decryptCode(OWNER_SECRET_HASH)) {
      setIsOwnerMode(true);
      
      // Store encrypted state in localStorage with timestamp for session expiry
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
      const secureState = encryptCode(JSON.stringify({
        active: true,
        expiry: expiryTime
      }));
      
      localStorage.setItem('ownerMode', secureState);
      return true;
    }
    return false;
  };

  const deactivateOwnerMode = () => {
    setIsOwnerMode(false);
    setShowAdminControls(false);
    localStorage.removeItem('ownerMode');
    localStorage.removeItem('adminControls');
    localStorage.removeItem('portfolioProjects'); // Optional: remove projects data for extra security
  };

  const toggleAdminControls = () => {
    if (isOwnerMode) {
      const newState = !showAdminControls;
      setShowAdminControls(newState);
      
      // Encrypt admin controls state
      const controlsState = encryptCode(JSON.stringify({
        state: newState,
        timestamp: Date.now()
      }));
      localStorage.setItem('adminControls', controlsState);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isOwnerMode,
      showAdminControls,
      activateOwnerMode, 
      deactivateOwnerMode,
      toggleAdminControls
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
