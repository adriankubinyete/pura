import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
    try {
        await prisma.$connect();
        console.log("✅ Conectado ao MongoDB!");
    } catch (error) {
        console.error("❌ Erro ao conectar:", error);
    } finally {
        await prisma.$disconnect();
    }
}

test();
