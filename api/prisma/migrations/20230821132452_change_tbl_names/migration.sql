/*
  Warnings:

  - You are about to drop the `ContentField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentField" DROP CONSTRAINT "ContentField_contentTypeId_fkey";

-- DropTable
DROP TABLE "ContentField";

-- DropTable
DROP TABLE "ContentType";

-- CreateTable
CREATE TABLE "ContentTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContentTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentFields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contentTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContentFields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentTypes_name_key" ON "ContentTypes"("name");

-- AddForeignKey
ALTER TABLE "ContentFields" ADD CONSTRAINT "ContentFields_contentTypeId_fkey" FOREIGN KEY ("contentTypeId") REFERENCES "ContentTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
