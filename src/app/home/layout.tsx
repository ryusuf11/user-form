// app/home/layout.tsx

import { Menu } from "lucide-react"; // Importing Lucide Menu icon
import { Button } from "@/components/atoms/button"; // Importing custom Button component
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/molecules/sheet"; // Sheet component for the drawer
import Link from "next/link"; // Importing Link for navigation
import Header from "@/components/organisms/header";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			{/* Top Navbar */}
			<Header />

			{/* Main Content */}
			<main className="flex-1 p-4 bg-white">{children}</main>
		</div>
	);
}
