import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function CreateUser() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		password: "",
		role: "USER",
		birthday: "",
		hiringDate: "",
		workingHours: 0,
		vacationDaysLeft: 0,
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
						<label htmlFor="birthday">Geburtstag</label>
						<input
							type="date"
							id="birthday"
							name="birthday"
							value={formData.birthday}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="hiringDate">Einstellungsdatum</label>
						<input
							type="date"
							id="hiringDate"
							name="hiringDate"
							value={formData.hiringDate}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="workingHours">
							Arbeitsstunden/Woche
						</label>
						<input
							type="number"
							id="workingHours"
							name="workingHours"
							value={formData.workingHours}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="vacationDaysLeft">
							Verbleibende Urlaubstage
						</label>
						<input
							type="number"
							id="vacationDaysLeft"
							name="vacationDaysLeft"
							value={formData.vacationDaysLeft}
							onChange={handleChange}
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
