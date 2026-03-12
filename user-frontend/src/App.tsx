import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import AlumniDashboard from './pages/AlumniDashboard'
import FrontPage from './components/FrontPage'
import PublicAlumniPortal from './pages/PublicAlumniPortal'

function App() {

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path='/register' element={<Register />} />
      <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
      <Route path="/public-alumni-portal" element={<PublicAlumniPortal />} />
    </Routes>
  )
}

export default App
