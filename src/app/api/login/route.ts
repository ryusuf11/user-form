import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { username, password } = await req.json();

	const user = await prisma.user.findUnique({ where: { username } });
	if (!user)
		return NextResponse.json(
			{ message: "Your passwords do not match." },
			{ status: 401 },
		);

	const isValid = await comparePassword(password, user.password);
	if (!isValid)
		return NextResponse.json(
			{ message: "Your passwords do not match." },
			{ status: 401 },
		);

	const token = generateToken(user.id);

	return NextResponse.json({
		token,
		user: {
			id: user.id,
			username: user.username,
		},
	});
}
