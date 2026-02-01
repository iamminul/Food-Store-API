-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "ClerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order-items" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order-items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'groceries',
    "brand" TEXT,
    "stock" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ClerkId_key" ON "users"("ClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order-items" ADD CONSTRAINT "order-items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order-items" ADD CONSTRAINT "order-items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
