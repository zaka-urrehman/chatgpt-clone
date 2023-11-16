"use client"
import { Session } from "next-auth"
import { SessionProvider } from 'next-auth/react'


interface props{
    children: React.ReactNode;
    session: Session|null;
}
const AuthProvider = ({children}:props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider