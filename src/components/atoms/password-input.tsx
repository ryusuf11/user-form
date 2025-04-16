"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/atoms/input";
import { cn } from "@/lib/utils";

export function PasswordInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	const [show, setShow] = React.useState(false);
	const inputId = props.id || "password-input";
	const toggleLabel = show ? "Hide password" : "Show password";

	return (
		<div className="relative">
			<Input
				type={show ? "text" : "password"}
				id={inputId}
				className={cn("pr-10", className)}
				aria-describedby={`${inputId}-toggle`}
				{...props}
			/>
			<button
				type="button"
				onClick={() => setShow((prev) => !prev)}
				className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
				aria-label={toggleLabel}
				aria-pressed={show}
				id={`${inputId}-toggle`}
			>
				{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
			</button>
		</div>
	);
}
