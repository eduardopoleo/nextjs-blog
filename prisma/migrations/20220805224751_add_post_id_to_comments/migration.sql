-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "author_email" VARCHAR(255) NOT NULL,
    "text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
