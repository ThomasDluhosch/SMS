import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Toolbar, Typography } from "@mui/material";

interface Address {
    street: string;
    number: string;
    plz: string;
    location: string;
}

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string | null;
    phone: string | null;
    role: "USER" | "ADMIN";
    address: Address;
}


function UserDetails() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("Fehler: Kein Authentifizierungs-Token gefunden.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Fetch-Fehler!", {
                        status: response.status,
                        statusText: response.statusText,
                        body: errorText,
                    });
                    throw new Error(`HTTP-Fehler: ${response.status}`);
                }

                const data: User = await response.json();

                console.log("Fetch erfolgreich! Empfangene Daten:", data);

                setUser(data);

            } catch (err) {
                console.error("Ein Fehler ist beim Fetchen aufgetreten:", err);
            }
        };

        fetchUser();

    }, [userId]);

    return (
        <Container sx={{ mt: 4 }}>
            <Toolbar />
            <Typography variant="h4">UserDetails-Komponente</Typography>

            {user ? (
                <>
                    ID: {user.id}
                    <br></br>
                    Username: {user.username}
                    <br></br>
                    Vorname: {user.firstName}
                    <br></br>
                    Nachname: {user.lastName}
                    <br></br>
                    Geburtstag: {user.birthday}
                    <br></br>
                    Telefon: {user.phone}
                    <br></br>
                    Rolle: {user.role}
                    <br></br>
                    Straße: {user.address?.street}
                    <br></br>
                    Hausnummer: {user.address?.number}
                    <br></br>
                    PLZ: {user.address?.plz}
                    <br></br>
                    Ort: {user.address?.location}
                </>
            ) : (
                <Typography sx={{ mt: 2 }}>
                    Benutzerdaten werden geladen...
                </Typography>
            )}
        </Container>
    );
}

export default UserDetails;