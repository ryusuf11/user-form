import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { id, password } = await req.json();

		const userId = (id || "").trim();
		const userPassword = (password || "").trim();

		if (!userId || !userPassword) {
			return NextResponse.json(
				{ error: "User ID and password are required." },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { username: userId },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User ID already exists." },
				{ status: 409 },
			);
		}

		const hashedPassword = await hashPassword(userPassword);

		const user = await prisma.user.create({
			data: {
				username: userId,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{
				message: "User created successfully.",
				user: {
					id: user.id,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("[REGISTER_POST]", error);
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 },
		);
	}
}
