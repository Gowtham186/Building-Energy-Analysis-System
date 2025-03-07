import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AnalysisDashboard from './Pages/AnalysisDashboard';
import AllDesigns from './Pages/AllDesigns';

function App() {
  return (
    <div className="App">
      <h1 className='text-center'>Building Energy Analysis System</h1>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={<AnalysisDashboard />}/>
        <Route path='/all-designs' element={<AllDesigns />} />
      </Routes>
    </div>
  );
}

export default App;
