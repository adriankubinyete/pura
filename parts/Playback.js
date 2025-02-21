#!/usr/bin/env node
import { BaseBlock } from "./Base.js";

export class Playback extends BaseBlock {
    constructor({ audio = "", ...baseConfig }) {
        super(baseConfig);
        this.audio = audio;
    }
}
