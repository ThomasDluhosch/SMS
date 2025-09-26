import SideBar from "../SideBar";
import UserTable from "./UserTable";
import "./Users.css";

import { useNavigate } from "react-router-dom";

export default function Users() {
	const navigate = useNavigate();

	const handleCreateUser = () => {
		navigate("/create-user");
	};

	return (
		<div className="view">
			<SideBar />

			<div className="content">

                <h1>Alle Mitarbeiter</h1>

				<button onClick={handleCreateUser} className="create-user-btn">
					Neuen Benutzer anlegen
				</button>

				<UserTable />
			</div>
		</div>
	);

	return null;
}
