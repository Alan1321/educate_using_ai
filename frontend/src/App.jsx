import Login from "./components/Login"
import Iselp from "./components/Iselp";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/iselp" element={<Iselp />} exact/>

      </Routes>
    </Router>
  )
}

export default App
