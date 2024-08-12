import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut as firebaseSignOut } from './firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUpWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};