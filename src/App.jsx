import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SwimmingPage from './SwimmingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swimming" element={<SwimmingPage />} />
      </Routes>
    </BrowserRouter>
  )
}