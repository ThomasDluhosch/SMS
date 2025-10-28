import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, MenuItem, Select, SelectChangeEvent, TextField, Toolbar, Typography } from "@mui/material";

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

interface UpdateUserPayload {
    username: string;
    firstName: string;
    lastName: string;
    birthday: string | null;
    phone: string | null;
    role: "USER" | "ADMIN";
    address: {
        street: string;
        number: string;
        plz: string;
        location: string;
    }
}

const API_BASE_URL = "http://localhost:8080/api"


function UserDetails() {

    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [originalUser, setOriginalUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("Nicht authentifiziert!");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
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

                setUser(data);
                setOriginalUser(data);

            } catch (err) {
                console.error("Ein Fehler ist beim Fetchen aufgetreten:", err);
            }
        };

        fetchUser();

    }, [userId]);


    const handleApiError = async (response: Response, action: string) => {
        console.error(`Fehler beim ${action}:`, response.status, response.statusText);
        let errorMsg = `Fehler: ${response.status} ${response.statusText}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
        } catch (e) {
        }
        alert(`${action} fehlgeschlagen: ${errorMsg}`);
    };


    const deleteUser = async () => {

        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("Nicht authentifiziert!");
            return;
        }

        if (!window.confirm("Benutzer wirklich löschen?")) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("User erfolgreich gelöscht!");
                alert("Benutzer wurde gelöscht.");
                navigate("/users");
            } else {
                await handleApiError(response, "Löschen");
            }

        } catch (err) {
            console.error("Ein Fehler ist beim Fetchen aufgetreten:", err);
            alert("Ein Netzwerkfehler ist aufgetreten. Bitte prüfe deine Verbindung.");
        }
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;

        setUser(prevUser => {

            if (!prevUser) return null;

            if (['street', 'number', 'plz', 'location'].includes(name)) {
                return {
                    ...prevUser,
                    address: {
                        ...prevUser.address,
                        [name]: value
                    }
                };
            }

            const updatedUser = {
                ...prevUser,
                [name]: value
            };

            if (name === "firstName") {
                updatedUser.username = `${value}-${updatedUser.lastName}`.toLowerCase();
            } else if (name === "lastName") {
                updatedUser.username = `${updatedUser.firstName}-${value}`.toLowerCase();
            }

            return updatedUser;
        });
    };


    const handleSave = async () => {

        const token = localStorage.getItem("authToken");

        if (!user || !token) {
            alert("Fehler: Benutzerdaten oder Token fehlen.");
            return;
        }

        const updateUserPayload: UpdateUserPayload = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            phone: user.phone,
            role: user.role,
            address: {
                street: user.address.street,
                number: user.address.number,
                plz: user.address.plz,
                location: user.address.location,
            }
        };

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateUserPayload),
            });

            if (response.ok) {
                const updatedUser: User = await response.json();

                setUser(updatedUser);
                setOriginalUser(updatedUser);
                setIsEditing(false);

                console.log("User erfolgreich aktualisiert!");
                alert("Benutzer wurde aktualisiert.");
            } else {
                await handleApiError(response, "Aktualisieren");
            }

        } catch (err) {
            console.error("Ein Netzwerkfehler ist aufgetreten:", err);
            alert("Ein Netzwerkfehler ist aufgetreten. Bitte prüfe deine Verbindung.");
        }
    };


    const handleCancel = () => {
        setUser(originalUser);
        setIsEditing(false);
    };


    const textFieldProps = (name: string, label: string, value: string | number | null | undefined) => ({
        name: name,
        label: label,
        value: value || "",
        disabled: !isEditing,
        onChange: handleChange,
        fullWidth: true,
        variant: isEditing ? "outlined" : "filled" as "outlined" | "filled",
        margin: "normal" as "normal",
    });


    return (
        <Container sx={{ mt: 4 }}>
            <Toolbar />

            {user ? (
                <Box component="form" noValidate autoComplete="off">
                    <Typography variant="h4" gutterBottom>{user?.id} - {user?.username}</Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>Stammdaten</Typography>

                    <TextField
                        {...textFieldProps("username", "Username", user.username)}
                        disabled
                    />

                    <TextField
                        {...textFieldProps("firstName", "Vorname", user.firstName)}
                    />

                    <TextField
                        {...textFieldProps("lastName", "Nachname", user.lastName)}
                    />

                    <TextField
                        {...textFieldProps("birthday", "Geburtstag", user.birthday)}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        {...textFieldProps("phone", "Telefon", user.phone)}
                    />

                    <Typography variant="h6" sx={{ mt: 2 }}>Adresse</Typography>

                    <TextField
                        {...textFieldProps("street", "Straße", user.address?.street)}
                    />

                    <TextField
                        {...textFieldProps("number", "Hausnummer", user.address?.number)}
                    />

                    <TextField
                        {...textFieldProps("plz", "PLZ", user.address?.plz)}
                    />

                    <TextField
                        {...textFieldProps("location", "Ort", user.address?.location)}
                    />

                    <Typography variant="h6" sx={{ mt: 2 }}>Rolle</Typography>
                    <Select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        disabled={!isEditing}
                        fullWidth
                        variant={isEditing ? "outlined" : "filled"}
                        margin="dense"
                    >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>

                </Box>
            ) : (
                <Typography sx={{ mt: 2 }}>
                    Nutzer existiert nicht
                </Typography>
            )}


            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                {isEditing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Speichern
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Abbrechen
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsEditing(true)}
                            disabled={!user}
                        >
                            Bearbeiten
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={deleteUser}
                            disabled={!user}
                        >
                            Nutzer Löschen
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default UserDetails;