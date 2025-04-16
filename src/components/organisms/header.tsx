"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/atoms/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/molecules/sheet";
import { AuroraText } from "../atoms/aurora-text";

export default function Header() {
	const pathname = usePathname();

	const routes = [
		{ href: "/home", label: "Home" },
		{ href: "/home/profile", label: "My Profile" },
		{ href: "/home/edit-profile", label: "Edit Profile" },
		{ href: "/logout", label: "Logout" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 justify-center">
			<div className="container flex h-16 px-4 items-center mx-auto">
				<Link href="/" className="flex items-center gap-2 mr-6 flex-1">
					<span className="font-bold inline-block text-lg lg:text-2xl">
						<AuroraText>MyApp</AuroraText>
					</span>
				</Link>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>

					<SheetContent side="left" className="p-5">
						<Link href="/" className="flex items-center gap-2 mb-8">
							<span className="font-bold">MyApp</span>
						</Link>
						<nav className="flex flex-col gap-4">
							{routes.map((route) => (
								<Link
									key={route.href}
									href={route.href}
									className={`text-sm font-medium transition-colors hover:text-primary ${
										pathname === route.href
											? "text-foreground"
											: "text-muted-foreground"
									}`}
								>
									{route.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
