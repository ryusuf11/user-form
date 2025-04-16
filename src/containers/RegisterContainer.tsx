import { FlickeringGrid } from "@/components/atoms/flickering-grid";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() =>
	import("@/components/organisms/register-form").then(
		(mod) => mod.RegisterForm,
	),
);

export const RegisterContainer = () => {
	return (
		<>
			<FlickeringGrid
				className="fixed top-0 left-0 w-screen h-screen z-[-1]"
				squareSize={4}
				gridGap={6}
				color="#6B7280"
				maxOpacity={0.4}
			/>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<RegisterForm />
			</div>
		</>
	);
};
