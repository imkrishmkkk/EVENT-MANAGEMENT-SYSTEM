// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import Events from "./pages/Events";
// Pages
import Dashboard from "./pages/UserDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import Header from "./components/Header";
import MyEvents from "./pages/MyEvent";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import { Contact } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />     
        <Route path="/contactus" element={<Contactus />} />     
        {/* Auth Routes (only accessible when NOT logged in) */}
        <Route element={<AuthRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Protected Routes (only accessible when logged in) */}
        <Route element={<PrivateRoute />}>
          <Route>
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;