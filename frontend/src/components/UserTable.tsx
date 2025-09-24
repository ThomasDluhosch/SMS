import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function UserTable() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (!token) {
			navigate("/login");
			return;
		}

		fetch("http://localhost:8080/api/users", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.status === 403) {
					setError(
						"Zugriff verweigert. Nur Administratoren dürfen diese Seite sehen. Sie werden in 3 Sekunden weitergeleitet."
					);

					setTimeout(() => {
						navigate("/dashboard");
					}, 3000);
					throw new Error("Forbidden");
				}

				if (response.status === 401) {
					navigate("/login");
					throw new Error("Unauthorized");
				}

				if (!response.ok) {
					throw new Error("Netzwerkantwort war nicht OK");
				}

				return response.json();
			})
			.then((data) => {
				setUsers(data);
			})
			.catch((error) => {
				if (
					error.message !== "Forbidden" &&
					error.message !== "Unauthorized"
				) {
					console.error("Fehler beim Abrufen der Daten:", error);
					setError("Ein Fehler ist aufgetreten.");
				}
			});
	}, [navigate]);

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	if (users.length === 0) {
		return <div>Lade Benutzerdaten...</div>;
	}

	return (
		<div className="view">
			<SideBar />
			<div className="user-table-container">
				<h1>User-Liste</h1>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Vorname</th>
							<th>Nachname</th>
							<th>Username</th>
							<th>Rolle</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: any) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.username}</td>
								<td>{user.role}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default UserTable;
