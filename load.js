#!/usr/bin/env node
const UID = "af639f2309acb28dc6e90c031dc9a27ea3e3b9c2cc92290ef6390f66e1ba3fed"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


class FlowManager {
    constructor() {
        this.blocks = {};  // Armazena todos os blocos criados
        this.path = [];    // Mantém o caminho percorrido
    }

    addBlock(block) {
        this.blocks[block.id] = block;  // Armazena o bloco pelo ID
        
        if (this.path.length > 0) {
            let lastBlock = this.blocks[this.path[this.path.length - 1]];

            if (!lastBlock.destination) {
                lastBlock.destination = block.id;
            } else if (typeof lastBlock.destination === "string") {
                lastBlock.destination = { "1": lastBlock.destination, "2": block.id };
            } else {
                const nextKey = Object.keys(lastBlock.destination).length + 1;
                lastBlock.destination[nextKey] = block.id;
            }
        }

        this.path.push(block.id); // Adiciona o novo bloco ao caminho
    }

    getPath() {
        return this.path.map(id => this.blocks[id]);
    }
}
const flow = new FlowManager();










// load every collection from hod database that contains "block_" prefix
async function getCollections() {
    const collections = await prisma.$runCommandRaw({
        listCollections: 1
    });

    return collections.cursor.firstBatch
        .map(col => col.name)
        .filter(name => name.startsWith("blocks_"));
}




async function mapDestination(uid) {
    for (const collection of await getCollections()) {
        const blocks = await prisma[collection].findMany({
            where: {
                user_id: {
                    equals: uid
                }
            }
        });

        console.log(`Blocks for collection ${collection}`)
        for (const block of blocks) {
            flow.addBlock(block);
        }
    }

    console.log(flow.getPath())
}

mapDestination(UID);