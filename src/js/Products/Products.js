import { database } from "../main.js";
import { RenderProducts } from "./RenderProducts.js";

export class Products{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const products = await database.get("products");

        for(let pro of products){
            const renderer = new RenderProducts(this.container, pro);
            renderer.render();
        }
    }
}
