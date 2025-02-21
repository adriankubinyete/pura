#!/usr/bin/env node

// get all parts
import { Playback } from "./parts/Playback.js";
import { TimeCondition } from "./parts/TimeCondition.js";
import { IVR } from "./parts/IVR.js";

const UID = "af639f2309acb28dc6e90c031dc9a27ea3e3b9c2cc92290ef6390f66e1ba3fed"


// let test = new Playback({
//     name: "Boas vindas",
//     user_id: UID,
//     audio: "boas_vindas.wav",
//     timeout: 10,
// }).save();

// let bomdia = new Playback({
//     name: "Bom dia",
//     user_id: UID,
//     audio: "bom_dia.wav",
//     timeout: 10,
// }).save();

// let boatarde = new Playback({
//     name: "Boa tarde",
//     user_id: UID,
//     audio: "boa_tarde.wav",
//     timeout: 10,
// }).save();

let boanoite = new Playback({
    name: "Boa noite",
    user_id: UID,
    audio: "boa_noite.wav",
    timeout: 10,
})

let main_ura = new IVR({
    name: "Ura",
    user_id: UID,
    audio: "ura.wav",
    timeout: 10,
    destination: {
        "1": boanoite.id,
        "2": boanoite.id
    }
})

console.log(main_ura)

boanoite.save()
main_ura.save()
