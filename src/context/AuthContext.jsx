/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, hasConfig } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ERROR_MAP = {
  'auth/email-already-in-use': 'Este email ya está registrado',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/invalid-email': 'El formato del email no es válido',
  'auth/user-not-found': 'Usuario no registrado. Primero creá una cuenta.',
  'auth/wrong-password': 'Contraseña incorrecta.',
  'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos.',
};

const getFirebaseError = (code, fallback) => {
  return ERROR_MAP[code] || fallback;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRole = async (uid) => {
    if (!db) return null;
    try {
      const docSnap = await getDoc(doc(db, 'usuarios', uid));
      if (docSnap.exists()) {
        return docSnap.data().rol || null;
      }
    } catch {
      // Silently fail - role is optional
    }
    return null;
  };

  useEffect(() => {
    if (!hasConfig || !auth) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const role = await fetchUserRole(currentUser.uid);
        setUserRole(role);
        setUser(currentUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    if (!hasConfig || !auth) {
      throw new Error('Firebase no está configurado. Revisa tu archivo .env');
    }
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const mensaje = getFirebaseError(err.code, err.message || 'Error al registrarse');
      setError(mensaje);
      throw new Error(mensaje, { cause: err });
    }
  };

  const login = async (email, password) => {
    if (!hasConfig || !auth) {
      throw new Error('Firebase no está configurado. Revisa tu archivo .env');
    }
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const role = await fetchUserRole(cred.user.uid);
      setUserRole(role);
    } catch (err) {
      const mensaje = getFirebaseError(err.code, 'Error al iniciar sesión. Intenta de nuevo.');
      setError(mensaje);
      throw new Error(mensaje, { cause: err });
    }
  };

  const logout = async () => {
    if (!auth) return;
    setError(null);
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <AuthContext.Provider value={{ user, userRole, isAdmin, loading, error, login, register, logout, hasConfig }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
