import { Button } from "../atoms/button";
import { DetailField } from "../molecules/detail-field";

export type AdditionalContentTabProps = {
	editable?: boolean;
	submit: () => void;
	reset: () => void;
};

export const AdditionalContentTab = ({
	editable = false,
	submit,
	reset,
}: AdditionalContentTabProps) => {
	return (
		<>
			<div className="flex flex-col gap-2">
				<DetailField label="Address" name="homeAddress" editable={editable} />
				<DetailField label="Country" name="country" editable={editable} />
				<DetailField
					label="Postal Code"
					name="postalCode"
					editable={editable}
				/>
				<DetailField
					label="Date of Birth"
					name="dateOfBirth"
					editable={editable}
					type="date"
				/>
				<DetailField
					label="Gender"
					name="gender"
					editable={editable}
					type="select"
					selectOptions={["MALE", "FEMALE"]}
				/>
				<DetailField
					label="Marital Status"
					name="maritalStatus"
					editable={editable}
					type="select"
					selectOptions={["SINGLE", "MARRIED"]}
				/>
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
