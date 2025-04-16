"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<>
			<Sonner
				theme={theme as ToasterProps["theme"]}
				className="toaster group"
				style={
					{
						"--normal-bg": "var(--popover)",
						"--normal-text": "var(--popover-foreground)",
						"--normal-border": "var(--border)",

						"--success-bg": "oklch(0.82 0.4 140)",
						"--success-text": "oklch(0.22 0.05 140)",

						"--error-bg": "oklch(0.88 0.35 25)",
						"--error-text": "var(--accent-foreground)",

						"--warning-bg": "oklch(0.9 0.32 65)",
						"--warning-text": "oklch(0.25 0.05 65)",
					} as React.CSSProperties
				}
				{...props}
			/>
		</>
	);
};

export { Toaster };
