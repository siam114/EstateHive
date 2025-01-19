/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./../firebase/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    try {
      const res = await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return res;
    } catch (error) {
      console.log("🚀 ~ updateUserProfile ~ error:", error);
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state capture", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
