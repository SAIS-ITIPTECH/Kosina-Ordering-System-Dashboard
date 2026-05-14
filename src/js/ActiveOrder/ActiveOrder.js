import { database } from "../main.js";
import { RenderActiveOrder } from "./RenderActiveOrder.js";

export class ActiveOrder{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        this.container.innerText = "";
        const active = await database.get("liveorder");
        let activeOrders = {};

        Object.values(active).forEach(element => {
            if (element["order_id"] in activeOrders) {
                activeOrders[element["order_id"]].push({
                    "name": element["name"],
                    "quantity": element["quantity"]
                })
                
            } else {
                activeOrders[element["order_id"]] = []
                activeOrders[element["order_id"]].push({
                    "name": element["name"],
                    "quantity": element["quantity"]
                })
            }
        });

        for (const [id, orders] of Object.entries(activeOrders)) {
            const renderer = new RenderActiveOrder(this.container, id, orders)
            renderer.render();
        }
    }
}
