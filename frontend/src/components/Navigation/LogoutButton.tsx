import { Box, Button, Divider, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { DropdownDivider } from "react-bootstrap";

export default function LogoutButton(userName: string) {
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userRole");
		localStorage.removeItem("userName");
		window.location.reload();
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					p: 2,
					width: "100%",
				}}
			>
				<Typography sx={{ mb: 2 }}>{userName}</Typography>
				<Button
					variant="outlined"
					startIcon={<LogoutIcon />}
					sx={{
						color: "primary.main",
						borderColor: "primary.main",
						border: 2,
						fontSize: 16,
						pt: 1,
						pb: 1,
						pl: 2,
						pr: 2,
						fontWeight: 500,
					}}
					onClick={handleLogout}
				>
					Abmelden
				</Button>
			</Box>
		</>
	);
}
