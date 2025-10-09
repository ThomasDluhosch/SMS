import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import UserTable from "./UserTable";
import "./Users.css";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

export default function Users() {
	const navigate = useNavigate();

	const handleCreateUser = () => {
		navigate("/create-user");
	};

	return (
		<Container>
			<Toolbar />
			{/* <div className="view"> */}
			{/* <SideBar /> */}

			<Box
				sx={{
					boxShadow: 3,
					m: "2rem",
					p: "2rem",
					mt: "3rem",

					borderRadius: "1rem",
					backgroundColor: "background.paper",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h1">Alle Mitarbeiter</Typography>

				<Button
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={handleCreateUser}
					sx={{
						display: "flex",
						border: 2

					}}
				>
					Neuen Benutzer anlegen
				</Button>
			</Box>

			<UserTable />

			<div className="content"></div>
			{/* </div> */}
		</Container>
	);
}
