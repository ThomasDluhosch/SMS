import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users/Users";
import CreateUser from "./components/Users/CreateUser";
import { ThemeContextProvider } from "./ThemeContext";
import { Box, CssBaseline } from "@mui/material";
import Navigation from "./components/Navigation/Navigation";

function App() {
	return (
		<ThemeContextProvider>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
				}}
			>
				<Navigation />
				<Routes>
					<Route path="/login" element={<Login />} />

					<Route
						element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
					>
						<Route path="/users" element={<Users />} />
						<Route path="/create-user" element={<CreateUser />} />
					</Route>

					<Route
						element={
							<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />
						}
					>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>

					<Route
						path="*"
						element={<Navigate to="/login" replace />}
					/>
				</Routes>
			</Box>
		</ThemeContextProvider>
	);
}

export default App;
