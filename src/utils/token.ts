"use server";

import { getCookie } from "@/lib/cookie";
import { cookies } from "next/headers";

export const getToken = async () => {
	if (typeof window === "undefined") {
		const cookieStore = await cookies();
		return cookieStore.get("auth_token")?.value || "";
	}

	const token = getCookie("auth_token");
	return token || null;
};
