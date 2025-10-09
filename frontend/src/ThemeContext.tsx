import {
	createContext,
	useState,
	useMemo,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material";

interface ThemeContextType {
	toggleColorMode: () => void;
	mode: PaletteMode;
}

export const ThemeContext = createContext<ThemeContextType>({
	toggleColorMode: () => {},
	mode: "light",
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<PaletteMode>(() => {
		const savedMode = localStorage.getItem("themeMode") as PaletteMode;
		return savedMode || "light";
	});

	useEffect(() => {
		localStorage.setItem("themeMode", mode);
	}, [mode]);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
			mode,
		}),
		[mode]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light"
						? {
								primary: {
									main: "#3494cb",
								},
								secondary: {
									main: "#7bc1ea",
								},
								background: {
									default: "#fbfdfe",
									paper: "#47b2f0",
								},
								text: {
									primary: "#030607",
									secondary: "#2a3032ff",
								},
						  }
						: {
								primary: {
									main: "#d83131",
									dark: "#8d1111",
									light: "#f72020",
								},
								secondary: {
									main: "#bfb0b0",
									dark: "#928c16",
									light: "#c4e342",
								},

								background: {
									default: "#1f1f1f",
									paper: "#393535ff",
								},
								text: {
									primary: "#f0e0e0",
									secondary: "#9e9292ff",
								},
						  }),
				},
				typography: {
					h1: {
						fontSize: "3rem",
						fontWeight: 700,
						color: mode === "light" ? "#030607" : "#f0e0e0",
					},
					h2: {
						fontSize: "2.2rem",
						fontWeight: 500,
					},
					fontFamily: [
						"Roboto",
						"-apple-system",
						"BlinkMacSystemFont",
						'"Segoe UI"',
						'"Helvetica Neue"',
						"Arial",
						"sans-serif",
					].join(","),
				},
			}),
		[mode]
	);

	return (
		<ThemeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	return useContext(ThemeContext);
};
