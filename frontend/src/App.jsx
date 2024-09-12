import Login from "./components/Login"
import Iselp from "./components/Iselp";
import SupportForm from "./components/SupportForm";
import Schools from "./components/School";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/iselp" element={<Iselp />} exact/>
        <Route path="/supportform" element={<SupportForm />} exact/>
        <Route path="/schools" element={<Schools />} exact/>
      </Routes>
    </Router>
  )
}

export default App
