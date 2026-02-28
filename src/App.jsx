import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
