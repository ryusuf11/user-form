import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import type { Gender, MaritalStatus, Prisma } from "@/generated/client";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	const token = authHeader?.split(" ")[1];
	if (!token)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const decoded = verifyToken(token);
	if (!decoded)
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });

	const user = await prisma.user.findUnique({
		where: { id: decoded.userId },
	});

	if (!user)
		return NextResponse.json({ error: "User not found" }, { status: 404 });

	return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData();
		const userId = req.cookies.get("auth_id")?.value;

		const salutation = formData.get("salutation") as string | null;
		const firstName = formData.get("firstName") as string | null;
		const lastName = formData.get("lastName") as string | null;
		const email = formData.get("email") as string | null;
		const homeAddress = formData.get("homeAddress") as string | null;
		const country = formData.get("country") as string | null;
		const postalCode = formData.get("postalCode") as string | null;
		const dateOfBirth = formData.get("dateOfBirth") as string | null;
		const gender = formData.get("gender") as Gender | null;
		const maritalStatus = formData.get("maritalStatus") as MaritalStatus | null;
		const hobbies = formData.get("hobbies") as string | null;
		const favoriteSports = formData.get("favoriteSports") as string | null;
		const musicPreferences = formData.get("musicPreferences") as string | null;
		const moviePreferences = formData.get("moviePreferences") as string | null;
		const profileImageUrl = formData.get("profileImage") as string | null;

		const spouseSalutation = formData.get("spouseSalutation") as string | null;
		const spouseFirstName = formData.get("spouseFirstName") as string | null;
		const spouseLastName = formData.get("spouseLastName") as string | null;

		const updatedUser = await prisma.user.update({
			where: { username: userId },
			data: {
				salutation: salutation || undefined,
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				email: email || undefined,
				homeAddress: homeAddress || undefined,
				country: country || undefined,
				postalCode: postalCode || undefined,
				dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
				gender: gender || undefined,
				maritalStatus: maritalStatus || undefined,
				profileImage: profileImageUrl || undefined,
				hobbies: hobbies || undefined,
				favoriteSports: favoriteSports || undefined,
				musicPreferences: musicPreferences || undefined,
				moviePreferences: moviePreferences || undefined,

				spouseSalutation: spouseSalutation || undefined,
				spouseFirstName: spouseFirstName || undefined,
				spouseLastName: spouseLastName || undefined,

				preferencesHobbies: hobbies || undefined,
				preferencesFavoriteSports: favoriteSports || undefined,
				preferencesMusicPreferences: musicPreferences || undefined,
				preferencesMoviePreferences: moviePreferences || undefined,
			},
		});

		return NextResponse.json({
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Failed to update user" },
			{ status: 500 },
		);
	}
}
