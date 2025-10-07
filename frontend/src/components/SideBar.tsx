import "./SideBar.css";
import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupsIcon from '@mui/icons-material/Groups';

const SideBar = () => {
	const userRole = localStorage.getItem("userRole");
	const userName = localStorage.getItem("userName");

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userRole");
		localStorage.removeItem("userName");
		window.location.reload();
	};

	return (
		<div className="sideBar">
			<div>
				<h2>Staff Management System</h2>

				<div className="sideBarLinks">
					<NavLink className="link" to="/dashboard">
						<SpaceDashboardIcon />
						Dashboard
					</NavLink>

					{userRole === "ADMIN" && (
						<>
							<hr
								style={{
									width: "100%",
									margin: 0,
									opacity: 1,
									border: "1px solid rgba(206, 206, 206, 1)",
								}}
							/>
							<NavLink className="link" to="/users">
								<GroupsIcon />
								Alle Mitarbeiter
							</NavLink>
						</>
					)}
				</div>
			</div>
			<div>
				{userName}
				<button className="logOutBtn" onClick={handleLogout}>
					Abmelden
				</button>
			</div>
		</div>
	);
};

export default SideBar;
