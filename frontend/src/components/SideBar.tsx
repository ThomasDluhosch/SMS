import "./SideBar.css";
import { Link } from "react-router-dom";

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
					<Link className="link" to="/dashboard">
						Dashboard
					</Link>

					{userRole === "ADMIN" && (
						<Link className="link" to="/users">
							Alle Mitarbeiter
						</Link>
					)}
				</div>
			</div>
			<div>
				{userName}
				<button onClick={handleLogout}>Abmelden</button>
			</div>
		</div>
	);
};

export default SideBar;
