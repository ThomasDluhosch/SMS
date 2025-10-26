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
import Settings from "./components/Settings";
import UserDetails from "./components/Users/UserDetails";

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

						<Route path="/users/:userId" element={<UserDetails />} />

					</Route>

					<Route
						element={
							<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />
						}
					>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/settings" element={<Settings />} />
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
