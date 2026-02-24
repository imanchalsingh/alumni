import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from "./components/AdminLogin"
import Alumni from './components/Alumni'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-alumni-profile" element={<Alumni />} />
    </Routes>
  )
}

export default App
