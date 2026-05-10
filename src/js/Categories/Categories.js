import { database } from "../main.js";
import { RenderCategories } from "./RenderCategories.js";

export class Categories{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const categories = await database.get("categories");
        for(let cat of categories){
            const renderer = new RenderCategories(this.container, cat)
            renderer.render();
        }
    }
}
