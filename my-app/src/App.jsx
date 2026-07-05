import { useState } from 'react'
import StudentDashboard from './StudentDashboard'
import StudentProfile from './StudentProfile'
// import AdminDashboard from './AdminDashboard'

function App() {
  // 'dashboard' = first screen a Student sees after logging in
  // 'profile'   = opened by clicking the profile picture on the dashboard
  const [view, setView] = useState('dashboard')

  return (
    <>
      {view === 'dashboard' && (
        <StudentDashboard onNavigateToProfile={() => setView('profile')} />
      )}
      {view === 'profile' && (
        <StudentProfile onBack={() => setView('dashboard')} />
      )}
    </>
  )
}

export default App
