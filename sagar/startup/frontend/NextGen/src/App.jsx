import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  

  return (
    <>
    <div className="App-Container overflow-hidden overflow-y-scroll">
          <Routes>
      <Route path='/' element={<><Sidebar /><Home/></>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
