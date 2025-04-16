import { Button } from "../atoms/button";
import { DetailField } from "../molecules/detail-field";

export type PreferenceContentTabProps = {
	editable?: boolean;
	submit: () => void;
	reset: () => void;
};

export const PreferenceContentTab = ({
	editable = false,
	submit,
	reset,
}: PreferenceContentTabProps) => {
	return (
		<>
			<div className="flex flex-col gap-2">
				<DetailField label="Hobbies" name="hobbies" editable={editable} />
				<DetailField label="Sports" name="favoriteSports" editable={editable} />
				<DetailField
					label="Music Genre"
					name="musicPreferences"
					editable={editable}
				/>
				<DetailField
					label="TV Shows"
					name="moviePreferences"
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
