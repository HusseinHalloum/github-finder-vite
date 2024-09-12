import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import './App.css'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <h1 className='text-3xl font-bold'>Content</h1>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
