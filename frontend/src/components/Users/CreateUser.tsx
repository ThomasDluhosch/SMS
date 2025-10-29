import { useEffect, useState } from "react";
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
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";

interface Address {
	street: string;
	number: string;
	plz: string;
	location: string;
}

interface Contract {
	hiringDate: string;
	monthlyHours: string;
	maxVacationDays: string;
}

interface UserFormData {
	username: string;
	firstName: string;
	lastName: string;
	birthday: string;
	password: string;
	phone: string;
	role: "USER" | "ADMIN";
	address: Address;
	contract: Contract;
}


export default function CreateUser() {

	const [formData, setFormData] = useState<UserFormData>({
		username: "",
		firstName: "",
		lastName: "",
		birthday: "",
		password: "",
		phone: "",
		role: "USER",
		address: {
			street: "",
			number: "",
			plz: "",
			location: "",
		},
		contract: {
			hiringDate: "",
			monthlyHours: "40",
			maxVacationDays: "30",
		},
	});

	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { firstName, lastName } = formData;

	useEffect(() => {
		setFormData((prevData) => {
			const newUsername =
				firstName && lastName
					? `${firstName}-${lastName}`.toLowerCase()
					: "";

			if (prevData.username === newUsername) {
				return prevData;
			}

			return {
				...prevData,
				username: newUsername,
			};
		});
	}, [firstName, lastName]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRoleChange = (e: SelectChangeEvent) => {
		setFormData((prevData) => ({
			...prevData,
			role: e.target.value as "USER" | "ADMIN",
		}));
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			address: {
				...prevData.address,
				[name]: value,
			},
		}));
	};

	const handleContractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			contract: {
				...prevData.contract,
				[name]: value,
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const token = localStorage.getItem("authToken");

		fetch("http://localhost:8080/api/users", {
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
					value={formData.username}
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
						label="Telefon"
						type="tel"
						name="phone"
						variant="outlined"
						margin="normal"
						value={formData.phone}
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
							value={formData.role}
							label="Rolle"
							onChange={handleRoleChange}
						>
							<MenuItem value="USER">User</MenuItem>
							<MenuItem value="ADMIN">Admin</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Typography
					variant="h6"
					component="h2"
					sx={{ mt: 2, mb: -1, color: "text.secondary" }}
				>
					Adresse
				</Typography>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="Straße"
						name="street"
						variant="outlined"
						margin="normal"
						value={formData.address.street}
						onChange={handleAddressChange}
						fullWidth
					/>
					<TextField
						label="Nr."
						name="number"
						variant="outlined"
						margin="normal"
						value={formData.address.number}
						onChange={handleAddressChange}
						sx={{ maxWidth: "100px" }}
					/>
				</Box>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="PLZ"
						name="plz"
						variant="outlined"
						margin="normal"
						value={formData.address.plz}
						onChange={handleAddressChange}
						sx={{ maxWidth: "120px" }}
					/>
					<TextField
						label="Ort"
						name="location"
						variant="outlined"
						margin="normal"
						value={formData.address.location}
						onChange={handleAddressChange}
						fullWidth
					/>
				</Box>

				<Typography
					variant="h6"
					component="h2"
					sx={{ mt: 2, mb: -1, color: "text.secondary" }}
				>
					Vertragsdetails
				</Typography>

				<TextField
					label="Einstellungsdatum"
					type="date"
					name="hiringDate"
					variant="outlined"
					margin="normal"
					value={formData.contract.hiringDate}
					onChange={handleContractChange}
					fullWidth
					InputLabelProps={{ shrink: true }}
				/>

				<Box
					sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
				>
					<TextField
						label="Monatliche Stunden"
						type="number"
						name="monthlyHours"
						variant="outlined"
						margin="normal"
						value={formData.contract.monthlyHours}
						onChange={handleContractChange}
						fullWidth
					/>
					<TextField
						label="Max. Urlaubstage"
						type="number"
						name="maxVacationDays"
						variant="outlined"
						margin="normal"
						value={formData.contract.maxVacationDays}
						onChange={handleContractChange}
						fullWidth
					/>
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
