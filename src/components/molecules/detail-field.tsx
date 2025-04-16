import { Label } from "@/components/atoms/label";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/atoms/select";
import { Input } from "@/components/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

interface DetailFieldProps {
	label: string;
	name: string;
	editable?: boolean;
	selectOptions?: string[];
	type?: "text" | "date" | "select"; // Added 'type' for dynamic input types
}

export function DetailField({
	label,
	name,
	editable = false,
	selectOptions = [],
	type = "text", // Default to text input
}: DetailFieldProps) {
	const {
		control,
		formState: { errors },
		getValues,
	} = useFormContext<FieldValues>();

	const errorMessage = errors[name]?.message;

	return (
		<div className="space-y-1">
			<Label htmlFor={name}>{label}</Label>
			{editable ? (
				type === "select" ? (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								value={field.value}
								onValueChange={field.onChange}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder={`Select ${label}`} />
								</SelectTrigger>
								<SelectContent>
									{selectOptions.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				) : type === "date" ? (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type="date"
								name={name}
								className="w-full"
								// Ensure the value is formatted as "yyyy-MM-dd"
								value={field.value ? field.value.slice(0, 10) : ""}
							/>
						)}
					/>
				) : (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<Input {...field} name={name} className="w-full" />
						)}
					/>
				)
			) : (
				<p className="text-muted-foreground text-sm">
					{getValues(name) || "N/A"}
				</p>
			)}

			{errorMessage && typeof errorMessage === "string" && (
				<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
			)}
		</div>
	);
}
