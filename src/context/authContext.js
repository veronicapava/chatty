import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])

    return ( //Todos los hijos van a obtener el context
        <authContext.Provider value={{ signup, login, user, logout, loading }}>
            {children}
        </authContext.Provider>
    )
}

