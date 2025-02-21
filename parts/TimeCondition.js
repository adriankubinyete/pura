#!/usr/bin/env node
import { BaseBlock } from "./Base.js";

export class TimeCondition extends BaseBlock {
    constructor({ timezone  = "America/Sao_Paulo", hour = {start: 0, end: 23}, minute = {start: 0, end: 59}, weekday = {start: 0, end: 6}, month = {start: 1, end: 12}, day = {start: 1, end: 31}, year = {start: 1970, end: 9999}, ...baseConfig }) {
        super(baseConfig);
        this.data.timezone = timezone;
        this.data.hour = hour;
        this.data.minute = minute;
        this.data.weekday = weekday; // 0 = Sunday, 6 = Saturday
        this.data.month = month; // 1 = January, 12 = December
        this.data.day = day;
        this.data.year = year;
    }
}
