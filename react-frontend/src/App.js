import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ListNavigation from "./components/ListEmployeeComponent";
import CreateNavigation from "./components/CreateEmployeeComponent";


function App() {
  return (
    <>
      <Router>      
        <HeaderComponent/>
        <div className="container">
          <Routes>
            <Route path="/" element={<ListNavigation />} />
            <Route path="/add-employee/:id" element={<CreateNavigation />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
