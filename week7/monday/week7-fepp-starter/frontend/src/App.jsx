import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import Signup from "./pages/Signup";
import LogIn from "./pages/Login";
import { useState } from "react";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // convert string → boolean
  );


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
             <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <LogIn setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/"
              element={
                !isAuthenticated ? <Navigate to="/login" /> : <Home />
              }
            />
           
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path="/jobs/:id" element={<JobPage />} />
            <Route path="/edit-job/:id" element={<EditJobPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
