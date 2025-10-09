import TextField from "@mui/material/TextField";

export default function InputFieldForm(title: string) {
	return (
		<TextField
			label="Vorname"
			name="firstName"
			variant="filled"
			margin="normal"
			value=""
			// onChange=""
			required
			fullWidth
			sx={{ borderRadius: 50, backgroundColor: "blueviolet" }}
		/>
	);
}
