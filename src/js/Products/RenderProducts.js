import { ColumnElements } from "../Parents/ColumnElements.js";

export class RenderProducts extends ColumnElements{
    constructor(container, pro){
        super(container, pro.name, pro.product_id, 'products');
        this.categoryId = pro.category_id
        this.price = pro.price;
        this.available = Boolean(pro.available);
        this.imageUrl = pro.display_url ?? null; 
        this.imgId = pro.image_id;
    }

    render(){
        this.renderAll(`
            <td class="py-6 px-6"><img class="productImg w-12 h-12 rounded-full bg-gray-50 object-cover" src="${this.imageUrl}" id="${this.id}Img" alt="${this.imgId}"></td>
            <td class="py-6 px-6 font-bold text-gray-400 uppercase">${this.categoryId}</td>
            <td class="py-6 px-6 font-mono text-sm">${this.id}</td>
            <td class="py-6 px-6 font-black uppercase">${this.name}</td>
            <td class="py-6 px-6 font-black text-[#76a609]">${this.price}</td>
            <td class="py-6 px-6"><span class="px-3 py-1 bg-[#f4f9e6] text-[#76a609] rounded-full text-[10px] font-black uppercase">${String(this.available).toUpperCase()}</span></td>
            <td class="py-6 px-6 text-center">
                <button class="editImageButton text-[#76a609] font-black text-[10px] uppercase tracking-widest hover:underline" value="${this.id}">Image</button>
                <button onclick="openEditProduct('edit', '${this.id}')" class="editButton text-[#76a609] font-black text-[10px] uppercase tracking-widest hover:underline" value="${this.id}">Edit</button>
                 <button onclick="openDelete('products', '${this.id}')" class="editButton text-[#76a609] font-black text-[10px] uppercase tracking-widest hover:underline" value="${this.id}">Delete</button>
            </td>
        `,);

        this.getImageButtons()
    }

    getImageButtons(){
        const elements = document.getElementsByClassName('editImageButton');
        for(let el of elements){
            el.onclick = async () => {
                upload.open(el.value)
            } 
        }
    }
}
