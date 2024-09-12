import Login from "./components/Login"
import Iselp from "./components/Iselp";
import SupportForm from "./components/SupportForm";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/iselp" element={<Iselp />} exact/>
        <Route path="/supportform" element={<SupportForm />} exact/>
      </Routes>
    </Router>
  )
}

export default App
