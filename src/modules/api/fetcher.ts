import { getToken } from "@/utils/token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type FetchOptions<D = unknown> = {
	method: string;
	url: string;
	payload?: D;
	next?: RequestInit["next"];
};

const createHeaders = async (isFormData: boolean): Promise<Headers> => {
	const headers = new Headers();

	if (!isFormData) {
		headers.set("Content-Type", "application/json");
	}

	headers.set("Accept", "application/json");

	const token = await getToken();
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return headers;
};

export const handleRequest = async <T, D = unknown>({
	method,
	url,
	payload,
	next,
}: FetchOptions<D>): Promise<T | null> => {
	const isFormData =
		typeof FormData !== "undefined" && payload instanceof FormData;

	const options: RequestInit = {
		method,
		headers: await createHeaders(isFormData),
		body: isFormData
			? (payload as FormData)
			: payload
				? JSON.stringify(payload)
				: undefined,
	};

	if (method === "GET" && next) {
		options.next = {
			...next,
		};
	}

	try {
		const res = await fetch(`${BASE_URL}${url}`, options);

		const isJson = res.headers
			.get("content-type")
			?.includes("application/json");

		if (!res.ok) {
			const errorBody = isJson ? await res.json() : await res.text();
			console.error(`❌ ${method} ${url} failed:`, {
				status: res.status,
				statusText: res.statusText,
				body: errorBody,
			});
			throw new Error(
				typeof errorBody === "string"
					? errorBody
					: errorBody?.message || "Request failed",
			);
		}

		if (isJson) {
			const data = (await res.json()) as T;
			return data;
		}

		return null;
	} catch (error) {
		console.error(`🚨 ${method} ${url} error:`, error);
		return null;
	}
};
