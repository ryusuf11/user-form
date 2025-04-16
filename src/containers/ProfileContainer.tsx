import React, { Suspense } from "react";
import ProfileTabsContainer from "./ProfileTabsContainer";
import { LoadingSpinner } from "@/components/atoms/loading-spinner";

const ProfileContainer = ({ editable = false }: { editable?: boolean }) => {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
			<Suspense fallback={<LoadingSpinner />}>
				<ProfileTabsContainer editable={editable} />
			</Suspense>
		</div>
	);
};

export default ProfileContainer;
