import Cookies from "js-cookie";

type CookieOptions = {
	expires?: number; // In days
	path?: string;
	sameSite?: "Lax" | "Strict" | "None";
	secure?: boolean;
};

const defaultOptions: CookieOptions = {
	path: "/",
	sameSite: "Lax",
	secure: process.env.NODE_ENV === "production",
};

export const setCookie = (
	name: string,
	value: string,
	options?: CookieOptions,
) => {
	Cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name: string): string | undefined => {
	return Cookies.get(name);
};

export const removeCookie = (name: string) => {
	Cookies.remove(name, { path: "/" });
};
