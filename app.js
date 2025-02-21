#!/usr/bin/env node
import { logging } from "./util/logging.js";

// get all parts
import { Playback } from "./parts/Playback.js";
import { TimeCondition } from "./parts/TimeCondition.js";
import { IVR } from "./parts/IVR.js";
import { Anchor } from "./parts/Anchor.js";
import FlowMapper from "./tests/FlowMapper.js";

const UID = "af639f2309acb28dc6e90c031dc9a27ea3e3b9c2cc92290ef6390f66e1ba3fed"
const l = logging.getLogger('pura')
l.addTransport(new logging.transports.Console())
l.addTransport(new logging.transports.FileRotate({
    filename: 'logs/pura.log-%DATE%',
    maxSize: '20m',
    maxFiles: 14
}))

const mapper = new FlowMapper();

let map = mapper
    .add(new Playback({
        name: "Boas vindas",
        user_id: UID,
        audio: "boas_vindas.wav",
        timeout: 10,
    }))
    .getMap()

console.log(map)

// let test = new Playback({
//     name: "Boas vindas",
//     user_id: UID,
//     audio: "boas_vindas.wav",
//     timeout: 10,
// })

// let bomdia = new Playback({
//     name: "Bom dia",
//     user_id: UID,
//     audio: "bom_dia.wav",
//     timeout: 10,
// })

// let boatarde = new Playback({
//     name: "Boa tarde",
//     user_id: UID,
//     audio: "boa_tarde.wav",
//     timeout: 10,
// })

// let anchor = new Anchor({
//     name: "Starting Position",
//     user_id: UID,
// })

// let boanoite = new Playback({
//     name: "Boa noite",
//     user_id: UID,
//     audio: "boa_noite.wav",
//     timeout: 10,
// })

// let main_ura = new IVR({
//     name: "Ura",
//     user_id: UID,
//     audio: "ura.wav",
//     timeout: 10,
//     destination: {
//         "1": boanoite.id,
//         "2": boanoite.id
//     }
// })

// console.log(main_ura)

// anchor.save()
// boanoite.save()
// main_ura.save()
