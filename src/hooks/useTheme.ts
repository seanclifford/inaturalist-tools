import { createTheme } from "@mantine/core";

export default function useTheme() {
	return createTheme({
		colors: {
			"inat-green": [
				"#f6ffe3",
				"#e3ffaa",
				"#d1ff71",
				"#beff39",
				"#acff00",
				"#86c600",
				"#74ac00",
				"#608e00",
				"#395500",
				"#131c00",
			],
		},
		primaryColor: "inat-green",
	});
}
