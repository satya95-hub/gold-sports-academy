import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SwimmingPage from './SwimmingPage'
import BadmintonPage from './BadmintonPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swimming" element={<SwimmingPage />} />
        <Route path="/badminton" element={<BadmintonPage />} />
      </Routes>
    </BrowserRouter>
  )
}