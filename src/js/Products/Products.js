import { database } from "../main.js";
import { RenderProducts } from "./RenderProducts.js";

export class Products{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        this.container.innerText = "";
        const products = await database.get("products");

        for(let pro of products){
            const renderer = new RenderProducts(this.container, pro);
            renderer.render();
        }
    }
}
