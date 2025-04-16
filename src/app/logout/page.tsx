"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/atoms/loading-spinner";
import { removeCookie } from "@/lib/cookie";

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			removeCookie("auth_token");
			removeCookie("auth_id");
			router.replace("/");
		}, 1500);
	}, [router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
			<LoadingSpinner className="w-10 h-10 mb-4 text-primary" />
			<p className="text-muted-foreground">Logging you out...</p>
		</div>
	);
}
