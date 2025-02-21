import { logging } from "../util/logging.js";

const LOGGER_NAME = 'pura.mapper'

export default class FlowMapper {
    constructor() {
        this.flowData = [];
    }

    _getLogging(name) {
        return logging.getLogger(LOGGER_NAME + '.' + name)
    }

    add(node) {
        const l = this._getLogging('add');

        l.debug(`Node ${node.id}${(node?.type && node?.name) ? ` (${node.type}: "${node.name}")` : ""}`);
        this.flowData.push(JSON.stringify(node));
        return this;
    }

    getEntryNodes() {
        let entryNodeIds = []
        entryNodeIds.push("0") // In production, this must get every block from "blocks_anchor" collection. They are the starting point.
        entryNodeIds.push("6")
        return entryNodeIds
    };

    getMap() {
        const l = this._getLogging('getMap');
        const entryNodes = this.getEntryNodes();
        if (!entryNodes.length) { l.warn(`❌ No entry nodes found.`); return };

        const map = [];
        const processed = new Set();

        const buildNode = (nodeId) => {
            l.debug(`🔰 Building nodeId "${nodeId}"`);
            const node = this.flowData.find((item) => item.id === nodeId);

            if (processed.has(node.id)) {
                return {
                    name: `⚠️ Looping: ${node.name}`,
                    destination: {}
                }
            }
            processed.add(node.id);

            return {
                name: node.name,
                destination: typeof node.destination === "object"
                ? Object.fromEntries(
                    Object.entries(node.destination).map(([key, value]) => [key, buildNode(value)])
                  )
                : buildNode(node.destination)
            };

        }

        for (const entryNode of entryNodes) {
            const node = this.flowData.find((item) => item.id === entryNode);
            if (!node) continue;

            console.log(`🔍 Entry node found: ${node.name}`)
            map.push(
                {
                    ...buildNode(node.id)
                }
            )
        }

        return {"flows": map};
    }
}

// const mapper = new FlowMapper();
// let map = mapper
//     .add({
//         id: "0",
//         name: "Anchor: start",
//         destination: "1"
//     })
//     .add({
//         id: "1",
//         name: 'Boas vindas',
//         destination: "2"
//     })
//     .add({
//         id: "2",
//         name: 'URA Principal',
//         destination: {
//             "1": "3", // comercial
//             "2": "4", // suporte
//             "3": "5" // financeiro
//         }
//     })
//     .add({
//         id: "3",
//         name: 'Oi Comercial',
//         destination: {}
//     })
//     .add({
//         id: "4",
//         name: 'Oi Suporte',
//         destination: {}
//     })
//     .add({
//         id: "5",
//         name: 'Oi Financeiro',
//         destination: "1"
//     })
//     .add({
//         id: "6",
//         name: 'Anchor: outra coisa',
//         destination: "7"
//     })
//     .add({
//         id: "7",
//         name: 'Informativo e encerra',
//         destination: {}
//     })
//     .getMap()

// console.log(`${JSON.stringify(map, null, 2)}`)