#!/usr/bin/env node
import { BaseBlock } from './Base.js';

export class IVR extends BaseBlock {
    constructor({ audio = "", timeout_seconds = 30, digit_timeout_seconds = 5, ...baseConfig }) {
        super(baseConfig);
        this.audio = audio;
        this.timeout_seconds = timeout_seconds;
        this.digit_timeout_seconds = digit_timeout_seconds;
    }
}
