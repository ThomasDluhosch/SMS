import { ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavigationButton(
	icon: React.ReactNode,
	text: string,
	link: string
) {
	return (
		<ListItemButton
			component={NavLink}
			to={link}
			className="link"
			sx={(theme) => ({
				height: "3rem",
				width: "100%",
				pl: 3,
				"&.active": {
					color: theme.palette.primary.main,
					fontWeight: 700,

					"& .MuiSvgIcon-root": {
						color: theme.palette.primary.main,
					},
				},

				"&:hover": {
					background: `none`,
					fontWeight: 700,
					color: theme.palette.text.primary,

					"& .MuiSvgIcon-root": {
						color: theme.palette.text.primary,
					},
				},
			})}
		>
			{icon}
			{text}
		</ListItemButton>
	);
}
