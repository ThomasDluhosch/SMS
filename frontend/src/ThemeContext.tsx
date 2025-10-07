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
								},
						  }
						: {
								primary: {
									main: "#3494cb",
								},
								secondary: {
									main: "#155b84",
								},

								background: {
									default: "#010304",
									paper: "#0f7ab8",
								},
								text: {
									primary: "#f8fbfc",
								},
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
