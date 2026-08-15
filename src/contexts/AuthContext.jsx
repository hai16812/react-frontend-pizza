import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import LoadingScreen from "../components/LoadingScreen";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null); // { name, email, role }
  const [loading, setLoading] = useState(true);

  // Create a customer account
  async function register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role: "customer",
      createdAt: serverTimestamp(),
    });
    return cred.user;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function fetchProfile(uid) {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        console.log("[Auth] profile loaded for uid", uid, "→", snap.data());
        setProfile(snap.data());
      } else {
        console.warn(
          "[Auth] No Firestore document found at users/" +
            uid +
            " — this UID has no profile, so role defaults to nothing (not admin)."
        );
        setProfile(null);
      }
    } catch (err) {
      console.error("[Auth] Failed to load profile for uid", uid, "→", err);
      setProfile(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchProfile(user.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    profile,
    isAdmin: profile?.role === "admin",
    loading,
    register,
    login,
    logout,
    resetPassword,
    refreshProfile: () => currentUser && fetchProfile(currentUser.uid),
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
