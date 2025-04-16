import { toast } from "sonner";
import {
	getUserInfo,
	updateUserInfo,
	uploadProfilePicture,
} from "../services/user.service";
import type { UpdateUserInfoPayload } from "../services/user.types";

export const actionGetUserProfile = async () => {
	const userData = await getUserInfo();

	return {
		userData,
	};
};

export const actionUpdateBasicInfo = async (payload: UpdateUserInfoPayload) => {
	try {
		const res = await updateUserInfo(payload);

		if (res?.user) {
			toast.success(res?.message || "Update success");
		} else {
			toast.error(res?.error || "Update failed");
		}

		return res;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message || "Update failed", {
				position: "bottom-center",
			});
		}
	}
};

export const actionUploadProfilePicture = async (formData: FormData) => {
	const res = await uploadProfilePicture(formData);
	return res;
};
