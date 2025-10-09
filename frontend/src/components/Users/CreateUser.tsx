import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
	Alert,
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

function CreateUser() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		password: "",
		role: "USER",
		birthday: "",
		hiringDate: "",
		workingHours: 40,
		vacationDaysLeft: 30,
	});

	console.log(getCurrentDate());

	function getCurrentDate(separator = "") {
		let newDate = new Date();
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();

		return `${date}${separator}${
			month < 10 ? `0${month}` : `${month}`
		}${separator}${year}`;
	}

	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | { name?: string; value: unknown }
		>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name as string]: value,
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

	const generatedUsername =
		formData.firstName && formData.lastName
			? `${formData.firstName}-${formData.lastName}`
			: "";

	return (
		<Container
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: "40rem",
					p: "2rem",
					borderRadius: "16px",
					boxShadow: 3,
					backgroundColor: "background.paper",
				}}
			>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					sx={{
						textAlign: "center",
						color: "secondary.main",
						fontWeight: 700,
					}}
				>
					Neuen Benutzer erstellen
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: "2rem",
						borderBottom: "none",
					}}
				>
					<TextField
						label="Vorname"
						name="firstName"
						variant="outlined"
						margin="normal"
						value={formData.firstName}
						onChange={handleChange}
						required
						fullWidth
					/>

					<TextField
						label="Nachname"
						name="lastName"
						variant="outlined"
						margin="normal"
						value={formData.lastName}
						onChange={handleChange}
						required
						fullWidth
					/>
				</Box>

				<TextField
					label="Benutzername"
					name="userName"
					variant="outlined"
					margin="normal"
					value={generatedUsername || " "}
					onChange={handleChange}
					slotProps={{
						input: {
							readOnly: true,
						},
					}}
					fullWidth
				/>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="Geburtstag"
						type="date"
						name="birthday"
						variant="outlined"
						margin="normal"
						value={formData.birthday}
						onChange={handleChange}
						fullWidth
						InputLabelProps={{ shrink: true }}
					/>

					<TextField
						label="Einstellungsdatum"
						type="date"
						name="hiringDate"
						variant="outlined"
						margin="normal"
						value={formData.hiringDate}
						onChange={handleChange}
						fullWidth
						InputLabelProps={{ shrink: true }}
					/>
				</Box>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="Arbeitsstunden/Woche"
						type="number"
						name="workingHours"
						variant="outlined"
						margin="normal"
						value={formData.workingHours}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="Gesamte Urlaubstage"
						type="number"
						name="vacationDaysLeft"
						variant="outlined"
						margin="normal"
						value={formData.vacationDaysLeft}
						onChange={handleChange}
						fullWidth
					/>
				</Box>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="Passwort"
						type="password"
						name="password"
						variant="outlined"
						margin="normal"
						value={formData.password}
						onChange={handleChange}
						required
						fullWidth
					/>

					<FormControl fullWidth required margin="normal">
						<InputLabel id="role-select-label">Rolle</InputLabel>
						<Select
							labelId="role-select-label"
							id="role"
							name="role"
							variant="outlined"
							value={formData.role}
							label="Rolle"
							onChange={handleChange as any}
						>
							<MenuItem value="USER">User</MenuItem>
							<MenuItem value="ADMIN">Admin</MenuItem>
						</Select>
					</FormControl>
				</Box>

				{error && <Alert severity="error">{error}</Alert>}

				<Button
					type="submit"
					variant="outlined"
					size="large"
					fullWidth
					endIcon={<AddIcon />}
					sx={{
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
					Benutzer erstellen
				</Button>
			</Box>
		</Container>
	);
}

export default CreateUser;
