import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postRegister } from "../services/user.service";
import { useState } from "react";

export const RegisterSchema = z
	.object({
		id: z.string().min(1, "User ID is required"),
		password: z.string().min(1, "Password is required"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Your passwords do not match.",
		path: ["confirmPassword"],
	});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const actionRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: RegisterSchemaType) => {
		setIsLoading(true);
		try {
			const res = await postRegister(data);

			if (!res) {
				toast.error("register failed", {
					position: "bottom-center",
				});
				return null;
			}
			router.push("/");

			setTimeout(() => {
				toast.success("Register success, please login");
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message || "register failed", {
					position: "bottom-center",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		...form,
		onSubmit,
		isLoading,
	};
};
