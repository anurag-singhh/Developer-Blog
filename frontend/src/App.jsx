import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import About from "./components/About us/About";
import Contact from "./components/contact us/contact";
import ViewBlog from "./pages/ViewBlog";
import UserAuth from "./Auth";
import { UserProvider } from "./UserContext";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleAuthenticate = () => {
    setIsAuthenticated((prev) => !prev);
    Navigate("/");
  };

  return (
    <BrowserRouter>
      <UserProvider>
        <Topbar
          isAuthenticate={isAuthenticated}
          handleAuthenticate={handleAuthenticate}
        />
        <Routes>
          {isAuthenticated && (
            <>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/addblog"
                element={
                  <UserAuth>
                    <Write />
                  </UserAuth>
                }
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/viewblog/:id" element={<ViewBlog />} />
              <Route path="/Login/:id" element={<Login />} />
              <Route
                path="/login"
                element={<Login handleAuthenticate={handleAuthenticate} />}
              />
              <Route
                path="/register"
                element={<Register handleAuthenticate={handleAuthenticate} />}
              />
            </>
          )}
         
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
