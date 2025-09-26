import "./SideBar.css";
import { NavLink } from "react-router-dom";

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
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z"
								stroke-linecap="round"
							/>
							<path
								d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z"
								stroke-linecap="round"
							/>
							<path
								d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z"
								stroke-linecap="round"
							/>
						</svg>
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
								<svg
									width="20px"
									height="20px"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
								</svg>
								Alle Mitarbeiter
							</NavLink>
						</>
					)}
				</div>
			</div>
			<div>
				{userName}
				<button className="logOutBtn" onClick={handleLogout}>Abmelden</button>
			</div>
		</div>
	);
};

export default SideBar;
