import { ProfileTabs } from "@/components/organisms/profile-tabs";
import { actionGetUserProfile } from "@/modules/actions/profile.action";
import { redirect } from "next/navigation";

export default async function ProfileTabsContainer({
	editable = false,
}: { editable?: boolean }) {
	const { userData } = await actionGetUserProfile();
	if (!userData) {
		return redirect("/logout");
	}

	return <ProfileTabs data={userData?.user} editable={editable} />;
}
