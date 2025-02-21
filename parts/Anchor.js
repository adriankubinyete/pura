#!/usr/bin/env node
import { BaseBlock } from './Base.js';

// Represents the starting point of a workflow.

export class Anchor extends BaseBlock {
    constructor({...baseConfig }) {
        super(baseConfig);
    }
}
