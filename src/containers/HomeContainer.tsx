"use client";

import React from "react";
import { RetroGrid } from "@/components/atoms/retro-grid";

const HomeContainer = () => {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
			<span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
				Home Page
			</span>

			<RetroGrid />
		</div>
	);
};

export default HomeContainer;
