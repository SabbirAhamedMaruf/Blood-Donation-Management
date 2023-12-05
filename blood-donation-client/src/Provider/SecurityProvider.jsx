import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/Firebase.config";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut } from "firebase/auth";
import useAxiosPublic from "../API/useAxiosPublic";

// Security context
export const SecurityContext = createContext(null);

const SecurityProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register Users
  const registerWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  // Login page
  const loginWithEmailAndPassword=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }

  // Sign Out User
  const handleSignOut =()=>{
    signOut(auth);
  }


  //   User observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const useremail = { email: currentUser.email };
        axiosPublic.post('/jwt', useremail)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    setLoading(false);
                }
            })
    }
    else {
        localStorage.removeItem('token');
        setLoading(false);
    }
    });
    return () => unsubscribe();
  }, [axiosPublic]);


  

  // Security context values
  const securityContextValues = {
    user,
    loading,
    registerWithEmailAndPassword,
    handleSignOut,
    loginWithEmailAndPassword,
  };
  return (
    <SecurityContext.Provider value={securityContextValues}>
      {children}
    </SecurityContext.Provider>
  );
};

SecurityProvider.propTypes = {
  children: PropTypes.node,
};

export default SecurityProvider;
