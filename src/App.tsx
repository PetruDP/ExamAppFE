import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import _404 from "./components/Routes/_404";
import Home from "./components/Routes/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import RequireAuth from "./features/auth/RequireAuth";
import Profile from "./components/Routes/Profile";
import SingleMovie from "./features/movies/SingleMovie";
import AdminDashboard from "./components/Routes/AdminDashboard";

function App() {
    return (
        <Routes>
            {/* Parent Layout */}
            <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>

                {/* Protected Routes - Everyone allowed */}
                <Route element={<RequireAuth roles={["USER", "ADMIN"]} />}>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/movie/:id" element={<SingleMovie />}></Route>
                </Route>

                {/* Protected Routes - Admins only */}
                <Route element={<RequireAuth roles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminDashboard />}></Route>
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<_404 />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
