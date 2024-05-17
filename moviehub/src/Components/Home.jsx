import React from 'react'
import Navbar from './Navbar'

const Home = () => {
    // const [movies, setMovies] = useState    
  return (
<div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen relative'>
  <div className='fixed top-0 left-0 -z-10 w-full min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
  <div className='container mx-auto px-8'>
    <Navbar /> 
  </div>
</div>
  )
}

export default Home