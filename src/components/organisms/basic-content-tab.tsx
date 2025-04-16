import { Button } from "../atoms/button";
import { DetailField } from "../molecules/detail-field";
import { ProfileImageUpload } from "../molecules/profile-image-upload";

export type BasicContentTabProps = {
	editable?: boolean;
	submit: () => void;
	reset: () => void;
};

export const BasicContentTab = ({
	editable = false,
	submit,
	reset,
}: BasicContentTabProps) => {
	return (
		<>
			<div className="flex flex-col gap-2">
				<ProfileImageUpload editable={editable} />

				<DetailField
					label="Salutation*"
					name="salutation"
					editable={editable}
					selectOptions={["Mr.", "Ms.", "Mrs."]}
					type="select"
				/>
				<DetailField label="First Name*" name="firstName" editable={editable} />
				<DetailField label="Last Name*" name="lastName" editable={editable} />
				<DetailField label="Email*" name="email" editable={editable} />
			</div>

			{editable && (
				<div className="flex gap-2 my-4">
					<Button type="submit" onClick={submit}>
						Save & Update
					</Button>
					<Button type="reset" variant="outline" onClick={() => reset()}>
						Cancel
					</Button>
				</div>
			)}
		</>
	);
};
