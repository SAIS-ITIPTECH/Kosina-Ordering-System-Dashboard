import { RenderHistory } from "./RenderHistory.js";
import { database } from "../main.js";

export class History{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        this.container.innerText = "";
        const history = await database.get("history");
        for(let his of history){
            const renderer = new RenderHistory(this.container, his)
            renderer.render();
        }
    }
}
