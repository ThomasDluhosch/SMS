import "./Navigation.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import NavigationButton from "./NavigationButton";
import LogoutButton from "./LogoutButton";

const drawerWidth = 300;

export default function Navigation() {
	const userRole = localStorage.getItem("userRole");
	const userName = localStorage.getItem("userName");

	const { mode, toggleColorMode } = useThemeContext();

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backgroundColor: "background.paper",
					color: "text.primary",
				}}
			>
				<Toolbar className="toolBar">
					<Typography variant="h5" noWrap component="div">
						Staff Management System
					</Typography>
					<IconButton
						sx={{ ml: 1 }}
						onClick={toggleColorMode}
						color="inherit"
					>
						{mode === "dark" ? (
							<Tooltip title={"Light-Mode"}>
								<LightModeIcon />
							</Tooltip>
						) : (
							<Tooltip title={"Dark-Mode"}>
								<NightlightIcon />
							</Tooltip>
						)}
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
						borderColor: "secondary.main",
						boxShadow: 2,
						opacity: 1,
					},
				}}
			>
				<Toolbar />
				<Box
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<List className="links">
						{NavigationButton(
							<SpaceDashboardIcon />,
							"Dashboard",
							"/dashboard"
						)}

						{NavigationButton(
							<SettingsIcon />,
							"Einstellungen",
							"/settings"
						)}

						{userRole === "ADMIN" && (
							<>
								<Divider
									variant="middle"
									sx={{
										height: "1px",
										backgroundColor: "secondary.main",
										opacity: 1,
									}}
								/>

								{NavigationButton(
									<GroupsIcon />,
									"Alle Mitarbeiter",
									"/users"
								)}
							</>
						)}
					</List>

					{LogoutButton(userName ?? "")}
				</Box>
			</Drawer>
		</Box>
	);
}
