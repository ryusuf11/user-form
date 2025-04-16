import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	api_key: process.env.CLOUDINARY_API_KEY!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;
