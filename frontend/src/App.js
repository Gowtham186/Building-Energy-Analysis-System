import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <h1 className='text-center'>Building Energy Analysis System</h1>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        
      </ul>

      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
