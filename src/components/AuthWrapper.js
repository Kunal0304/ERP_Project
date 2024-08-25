import React from 'react'
import { Navigate } from 'react-router'

export default function AuthWrapper({ children }) {
    return (
        localStorage.getItem("token") ? children : <Navigate to={'/login'} />
    )
}
