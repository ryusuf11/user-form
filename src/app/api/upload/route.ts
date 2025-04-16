import { type NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	const token = authHeader?.split(" ")[1];
	if (!token)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const decoded = verifyToken(token);
	if (!decoded)
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });

	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file provided" }, { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	try {
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: "profile_images",
						use_filename: true,
						unique_filename: false,
						overwrite: true,
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					},
				)
				.end(buffer);
		});

		return NextResponse.json(uploadResult);
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
