import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function CreateUser() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		role: "USER",
	});

	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const token = localStorage.getItem("authToken");

		fetch("http://localhost:8080/api/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Benutzer konnte nicht erstellt werden.");
				}
				return response.json();
			})
			.then(() => {
				alert("Benutzer erfolgreich erstellt!");
				navigate("/users");
			})
			.catch((err) => {
				console.error(err);
				setError(err.message);
			});
	};

	return (
		<div className="view">
			<SideBar />
			<div className="form-container">
				<h1>Neuen Benutzer erstellen</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="firstName">Vorname</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Nachname</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Passwort</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="role">Rolle</label>
						<select
							id="role"
							name="role"
							value={formData.role}
							onChange={handleChange}
						>
							<option value="USER">User</option>
							<option value="ADMIN">Admin</option>
						</select>
					</div>

					{error && <p className="error-message">{error}</p>}

					<button type="submit" className="submit-btn">
						Benutzer erstellen
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateUser;
