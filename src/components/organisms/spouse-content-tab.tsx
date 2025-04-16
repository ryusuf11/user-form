import { Button } from "../atoms/button";
import { DetailField } from "../molecules/detail-field";

export type SpouseContentTabProps = {
	editable?: boolean;
	submit: () => void;
	reset: () => void;
};

export const SpouseContentTab = ({
	editable = false,
	submit,
	reset,
}: SpouseContentTabProps) => {
	return (
		<>
			<div className="flex flex-col gap-2">
				<DetailField
					label="Spouse Salutation"
					name="spouseSalutation"
					editable={editable}
					type="select"
					selectOptions={["Mr.", "Ms.", "Mrs."]}
				/>
				<DetailField
					label="Spouse First Name"
					name="spouseFirstName"
					editable={editable}
				/>
				<DetailField
					label="Spouse Last Name"
					name="spouseLastName"
					editable={editable}
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
