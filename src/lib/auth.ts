import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) =>
	bcrypt.compare(password, hash);

export const generateToken = (userId: string) => {
	return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET) as { userId: string };
	} catch {
		return null;
	}
};
