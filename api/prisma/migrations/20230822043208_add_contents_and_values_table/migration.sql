-- CreateTable
CREATE TABLE "Contents" (
    "id" SERIAL NOT NULL,
    "contentTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentValues" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContentValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contents" ADD CONSTRAINT "Contents_contentTypeId_fkey" FOREIGN KEY ("contentTypeId") REFERENCES "ContentTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentValues" ADD CONSTRAINT "ContentValues_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentValues" ADD CONSTRAINT "ContentValues_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "ContentFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
