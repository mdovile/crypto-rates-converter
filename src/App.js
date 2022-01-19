import './App.css';
import { HomePage } from './HomePage';
import { Header } from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
