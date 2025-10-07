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
								primary: { main: "#8047c9" },
								secondary: { main: "#b790e9" },

								background: {
									default: "#f8f5fb",
									paper: "#f8f5fb",
								},

								text: { primary: "#0a070d" },
						  }
						: {
								primary: { main: "#6f36ba" },
								secondary: { main: "#3c166f" },

								background: {
									default: "#08040b",
									paper: "#08040b",
								},

								text: { primary: "#f5f2f8" },
						  }),
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
