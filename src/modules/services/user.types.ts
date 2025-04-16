import type { Prisma } from "@/generated/client";

export type UpdateUserInfoPayload = Prisma.UserUpdateInput & {
	spouseSalutation?: string | null;
	spouseFirstName?: string | null;
	spouseLastName?: string | null;
	hobbies?: string | null;
	favoriteSports?: string | null;
	musicPreferences?: string | null;
	moviePreferences?: string | null;
};

export type AllUser = Prisma.UserGetPayload<false>;
