class UploadPanel{
    constructor(){
        this.database = new DatabaseConnector("image");
    }

    open(id){
        this.id = id
        uploadPanel.classList.toggle("hide");

        addImage.onclick = async () => {
            if (this.checkIfEmpty().includes("null")) {
                const img64 = await this.getImage()
                if (!img64) { return; }
                this.addImage(img64)
            } else {
                window.alert("THIS PRODUCT HAS ALREADY IMAGE!");
            }
        }

        replaceImage.onclick = async () => {
            if (this.checkIfEmpty().includes("null")) {
                window.alert("THIS PRODUCT NO IMAGE!");
            } else {
                const img64 = await this.getImage()
                if (!img64) { return; }
                this.replaceImage(img64)
            }
        }

        removeImage.onclick = () => {
            if (this.checkIfEmpty().includes("null")) {
                window.alert("THIS PRODUCT NO IMAGE!");
            } else {
                this.removeImage()
            }
        }

        closeUpload.onclick = () => {
            uploadPanel.classList.toggle("hide");
        }
    }

    checkIfEmpty(){
        return document.getElementById(`${this.id}Img`).src
    }

    getImage() {
        return new Promise((resolve, reject) => {
            const file = imageInput.files[0];
            if (!file) return reject(window.alert("No file selected"));

            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async addImage(img64){
        const data = await this.database.post({
            "image": img64,
            "productId": this.id,
        })
        this.results(data);
    }

    async replaceImage(img64){
        const data = await this.database.patch({
            "image": img64,
            "productId": this.id,
            "imageId": document.getElementById(`${this.id}Img`).alt
        }, this.imageId)
        this.results(data);
    }

    async removeImage(){
        const data = await this.database.delete(document.getElementById(`${this.id}Img`).alt)
        this.results(data);
    }

    results(data){
        if (data["status"] === "error") {
            window.alert(`${data["message"]}`);
        }
        else{
            window.alert(`${data["message"]}`);
            uploadPanel.classList.toggle("hide");
            let newDashboard = new ProductsDashboard("products")
            dashboardContainer.classList.toggle("hide");
            newDashboard.start()
        }
    }
}
