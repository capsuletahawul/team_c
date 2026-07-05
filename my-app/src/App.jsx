import { useState } from 'react'
import StudentDashboard from './StudentDashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <StudentDashboard/>
         </>
  )
}

export default App
