import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Datasets from "./pages/Datasets";
import AddGraphs from "./pages/AddGraphs";

function App() {
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/:dataset_id/graphs/add" element={<AddGraphs />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
