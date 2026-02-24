import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import AlumniProfile from './components/AlumniProfile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/alumni-profile" element={<AlumniProfile />} />
    </Routes>
  )
}

export default App
