import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserTable from "./components/UserTable";


function App() {
	return (
        <div className="App">
			
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/users" element={<UserTable />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
	);
}

export default App;
