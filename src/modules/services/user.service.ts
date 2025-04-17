import { GET, POST, PUT } from "@/modules/api";
import type { AllUser, UpdateUserInfoPayload } from "./user.types";

export const postLogin = async (payload: {
	username: string;
	password: string;
}) => {
	return await POST<{ token: string; username: string }, typeof payload>(
		"/api/login",
		payload,
	);
};

export const postRegister = async (payload: {
	id: string;
	password: string;
}) => {
	return await POST<{ message: string }, typeof payload>(
		"/api/register",
		payload,
	);
};

export const getUserInfo = async () => {
	return await GET<{
		user: AllUser;
	}>("/api/profile", {
		tags: ["user"],
	});
};

export const updateUserInfo = async (payload: UpdateUserInfoPayload) => {
	const formData = new FormData();

	for (const [key, value] of Object.entries(payload)) {
		if (value !== undefined && value !== null) {
			formData.append(key, value instanceof File ? value : String(value));
		}
	}

	return await PUT<
		{ message: string; user: AllUser; error?: string },
		FormData
	>("/api/profile", formData);
};

export const postLogout = async () => {
	return await POST<{ message: string }>("/api/auth/logout");
};

export const uploadProfilePicture = async (formData: FormData) => {
	return await POST<{ secure_url: string }, FormData>("/api/upload", formData);
};
