import { RenderDailySales } from "./RenderDailySales.js";
import { database } from "../main.js";

export class DailySales{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const sales = await database.get("sales");
        for(let sal of sales){
            const renderer = new RenderDailySales(this.container, sal)
            renderer.render();
        }
    }
}
