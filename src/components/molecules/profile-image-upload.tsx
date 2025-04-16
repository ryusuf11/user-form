"use client";

import { type ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { actionUploadProfilePicture } from "@/modules/actions/profile.action";
import { toast } from "sonner";

interface Props {
	editable?: boolean;
}

export function ProfileImageUpload({ editable }: Props) {
	const { control, setValue, watch } = useFormContext();
	const imageUrl = watch("profileImage");

	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		const formData = new FormData();
		formData.append("file", file);

		try {
			const data = await actionUploadProfilePicture(formData);
			if (data?.secure_url) {
				setValue("profileImage", data.secure_url, { shouldValidate: true });
			}
		} catch (err) {
			toast.error("Upload failed");
			console.error("Upload error:", err);
		} finally {
			setIsUploading(false);
		}
	};

	const handleLabelClick = () => {
		// Trigger the file input click when the label is clicked
		fileInputRef.current?.click();
	};

	return (
		<div className="flex items-center gap-4">
			<div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border">
				{imageUrl ? (
					<Image src={imageUrl} alt="Profile" fill className="object-cover" />
				) : (
					<span className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
						No Photo
					</span>
				)}
			</div>

			{editable && (
				<div>
					<Controller
						name="profileImage"
						control={control}
						render={() => (
							<div className="flex items-center gap-2">
								{/* Hidden file input with ref */}
								<input
									type="file"
									accept="image/*"
									onChange={handleUpload}
									className="hidden"
									ref={fileInputRef} // Attach the ref
								/>
								{/* Label that triggers the file input */}
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<label htmlFor="upload" onClick={handleLabelClick}>
									<Button type="button" size="sm" disabled={isUploading}>
										{isUploading ? "Uploading..." : "Change Photo"}
									</Button>
								</label>
							</div>
						)}
					/>
				</div>
			)}
		</div>
	);
}
