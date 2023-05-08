import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Datasets from "./pages/Datasets";
import Graphs from "./pages/Graphs";
import AddGraphs from "./pages/AddGraphs";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout />
      <div className="app">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/:dataset_id/graphs" element={<Graphs />} />
              <Route path="/:dataset_id/graphs/add" element={<AddGraphs />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
