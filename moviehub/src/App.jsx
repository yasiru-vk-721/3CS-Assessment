import Home from "./Components/Home"
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path = "/" element = {<Home/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App;
