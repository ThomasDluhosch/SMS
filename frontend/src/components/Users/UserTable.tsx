import {
	Checkbox,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

	function formatDate(dateString: string) {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		};

		return date.toLocaleDateString("de-DE", options);
	}

	return (
		<Container
			sx={{
				boxShadow: 3,
				backgroundColor: "background.paper",
				borderRadius: "1rem",
			}}
		>
			<TableContainer>
				<Table
					aria-label="simple table"
				>
					<TableHead sx={{ fontWeight: 700 }}>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Vorname</TableCell>
							<TableCell>Nachname</TableCell>
							<TableCell>Username</TableCell>
							<TableCell align="center">Geburtstag</TableCell>
							<TableCell align="center">Telefon</TableCell>
							<TableCell align="center">Rolle</TableCell>

						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user: any) => (
							<TableRow
								key={user.id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{user.id}
								</TableCell>
								<TableCell>{user.firstName}</TableCell>
								<TableCell>{user.lastName}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell align="center">
									{formatDate(user.birthday)}
								</TableCell>
								<TableCell align="center">
									{user.phone}
								</TableCell>
								<TableCell align="center">
									{user.role}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default UserTable;
