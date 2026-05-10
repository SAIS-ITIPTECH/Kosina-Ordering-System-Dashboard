import { RenderDetails } from "./RenderDetails.js";
import { database } from "../main.js";

export class Details{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const details = await database.get("details");
        for(let det of details){
            const renderer = new RenderDetails(this.container, det)
            renderer.render();
        }
    }
}
