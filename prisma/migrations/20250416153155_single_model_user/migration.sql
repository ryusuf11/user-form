/*
  Warnings:

  - You are about to drop the column `preferencesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Spouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Spouse" DROP CONSTRAINT "Spouse_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_preferencesId_fkey";

-- DropIndex
DROP INDEX "User_preferencesId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferencesId",
ADD COLUMN     "preferencesFavoriteSports" TEXT,
ADD COLUMN     "preferencesHobbies" TEXT,
ADD COLUMN     "preferencesMoviePreferences" TEXT,
ADD COLUMN     "preferencesMusicPreferences" TEXT,
ADD COLUMN     "spouseFirstName" TEXT,
ADD COLUMN     "spouseLastName" TEXT,
ADD COLUMN     "spouseSalutation" TEXT;

-- DropTable
DROP TABLE "Preferences";

-- DropTable
DROP TABLE "Spouse";
