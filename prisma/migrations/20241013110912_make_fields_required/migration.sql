/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "author" DROP NOT NULL;
