"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
	return (
		<motion.div
			className={cn("flex items-center justify-center", className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"
				animate={{ rotate: 360 }}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
					duration: 1,
				}}
			/>
		</motion.div>
	);
}
