import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import { postLogin } from "../services/user.service";
import { useState } from "react";

const loginSchema = z.object({
	id: z.string().min(1, "User ID is required"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const actionLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { register, handleSubmit, formState, control } = useForm<LoginFormData>(
		{
			resolver: zodResolver(loginSchema),
		},
	);

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			const response = await postLogin({
				username: data.id,
				password: data.password,
			});

			if (!response) throw new Error("login failed");
			setCookie("auth_token", response.token, {
				expires: data.rememberMe ? 365 : 3,
			});
			setCookie("auth_id", data.id, {
				expires: data.rememberMe ? 365 : 3,
			});

			toast.success("Login success");
			router.push("/home/profile");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message || "login failed", {
					position: "bottom-center",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		register,
		handleSubmit,
		formState,
		onSubmit,
		control,
		isLoading,
	};
};
