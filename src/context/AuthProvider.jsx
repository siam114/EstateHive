/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./../firebase/firebase.init";
import useAxiosPublic from "./../hook/useAxiosPublic";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async() => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem('access-token')
    localStorage.removeItem('userInfo')
    setUser(null)
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
    signInWithGoogle,
  };

  useEffect(() => {
    const initAuth = onAuthStateChanged(auth, (currentUser) => {
      if (user) {
        return;
      }
      setLoading(true)
      const userString = localStorage.getItem('userInfo')
      if(!!userString){
         const userInfo = JSON.parse(userString)
         setUser(userInfo)
         setLoading(false)
         return
      }
      console.log("state capture", currentUser);
      if (currentUser) {
        //get token and store client
        axiosPublic.post(`/user/${currentUser.email}`).then((res) => {
          if (!res.data) {
            toast.error("User Not Found");
            logOut();
            return;
          }
          const { token, ...userInfo } = res.data;
          localStorage.setItem("access-token", token);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUser(userInfo);
        });
      } else {
        //remove token
        localStorage.removeItem("access-token");
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      return initAuth();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
