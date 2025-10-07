import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, Navbar } from "react-bootstrap";
import {
	Box,
	Button,
	Input,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

interface DecodedToken {
	sub: string;
	role: "ADMIN" | "USER";
	iat: number;
	exp: number;
}

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");

		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				const { token } = data;

				const decodedToken = jwtDecode<DecodedToken>(token);
				const userRole = decodedToken.role;

				console.log(userRole);

				localStorage.setItem("authToken", token);
				localStorage.setItem("userRole", userRole);
				localStorage.setItem("userName", username);

				navigate("/dashboard");
			} else {
				setError(
					"Die Anmeldung ist fehlgeschlagen. \n Bitte überprüfen Sie Ihre Eingaben."
				);
			}
		} catch (err) {
			console.error(err);
			setError("Ein Netzwerkfehler ist aufgetreten.");
		}
	};

	return (
		<Container>
			<Box
				sx={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Toolbar />

				<Typography variant="h4">Anmelden</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						width: "350px",
					}}
				>
					<TextField
						id="outlined-basic"
						label="Benutzername"
						variant="outlined"
						margin="normal"
						onChange={(e) => setUsername(e.target.value)}
						required
						error={!!error}
					/>

					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						margin="normal"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						required
						error={!!error}
						helperText={error}
					/>

					<Button
						onClick={handleSubmit}
						endIcon={<LoginIcon />}
						sx={{
							color: "primary.main",
							borderColor: "primary.main",
							border: 2,
							fontSize: 16,
							mt: 2,
							pt: 1,
							pb: 1,
							pl: 2,
							pr: 2,
							fontWeight: 500,
						}}
					>
						Anmelden
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
