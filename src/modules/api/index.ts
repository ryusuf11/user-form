import { handleRequest } from "./fetcher";

export const GET = <T>(
	url: string,
	next?: NextFetchRequestConfig,
): Promise<T | null> => handleRequest<T>({ method: "GET", url, next });

export const POST = <T, D = unknown>(
	url: string,
	payload?: D,
): Promise<T | null> => handleRequest<T, D>({ method: "POST", url, payload });

export const PUT = <T, D = unknown>(
	url: string,
	payload?: D,
): Promise<T | null> => handleRequest<T, D>({ method: "PUT", url, payload });

export const PATCH = <T, D = unknown>(
	url: string,
	payload?: D,
): Promise<T | null> => handleRequest<T, D>({ method: "PATCH", url, payload });

export const DELETE = <T>(url: string): Promise<T | null> =>
	handleRequest<T>({ method: "DELETE", url });

export const OPTIONS = <T>(url: string): Promise<T | null> =>
	handleRequest<T>({ method: "OPTIONS", url });
