import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'

export const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth)
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08050D] flex items-center justify-center">
        <div className="text-[#C084FC] text-sm">
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    )
  }

  return <Outlet />
}