import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import AlumniDashboard from './pages/AlumniDashboard'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
    </Routes>
  )
}

export default App
