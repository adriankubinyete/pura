#!/usr/bin/env node
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";


const prisma = new PrismaClient();

export class BaseBlock {
    constructor({ name = "Unnamed", user_id, destination = {}, last_update = new Date().toISOString(), created_at = new Date().toISOString()}) {
        this.id = new ObjectId().toHexString();
        this.type = this.constructor.name.toLowerCase(); // Define o tipo baseado na classe
        this.name = name;
        this.user_id = user_id;
        this.destination = destination;
        this.last_update = last_update;
        this.created_at = created_at;
    }

    async save() {
        if (!this.type) { throw new Error("Block type is required") }
        const collection = `blocks_${this.type}`;

        try {

            // removendo a prop. id ao salvar
            const {type, ...blockData } = this;

            const newBlock = await prisma[collection].create({
                data: blockData
            });

            this.id = newBlock.id;
            console.log(`✅ ${this.type.toUpperCase()} :: "${this.name}"`)
        } catch (error) {
            console.error(`❌ ${this.type.toUpperCase()} :: "${this.name}"`)
            console.error(error)
        }
        
        return this;
    }

    getData() {
        const data = { ...this };
        delete data.id; // ID será gerado pelo banco
        return data;
    }
}