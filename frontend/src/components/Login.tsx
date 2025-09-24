import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

				if (userRole === "ADMIN") {
					navigate("/users");
				} else {
					navigate("/dashboard");
				}
			} else {
				setError(
					"Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben."
				);
			}
		} catch (err) {
			console.error(err);
			setError("Ein Netzwerkfehler ist aufgetreten.");
		}
	};

	return (
		<div className="login">
			<h2>Anmeldung</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						value={username}
						placeholder="Benutzername"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="password"
						value={password}
						placeholder="Passwort"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Anmelden</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Login;
