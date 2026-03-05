import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from "./components/AdminLogin"
import AdminDashboard from './components/AdminDashboard'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-alumni-profile" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
