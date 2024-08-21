import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const axiosPublic = useAxiosPublic();

  //   Google Login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   Create User
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Update user Profile
  const updateUserProfile = (name, photo) => {
    setloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //   SignIn User
  const logIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   LogOut
  const logOut = () => {
    return signOut(auth);
  };

  //   User State Ovserver
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      if (currenUser) {
        // generate token
        const userInfo = { email: currenUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setloading(false);
          }
        });
      } else {
        // do something
        localStorage.removeItem("access-token");
        setloading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [auth, axiosPublic]);

  const authInfo = {
    user,
    loading,
    googleLogin,
    createUser,
    logIn,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
