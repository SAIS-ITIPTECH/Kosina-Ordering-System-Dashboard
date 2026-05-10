// MAIN DASHBOARD CLASS

class Dashboard{
    constructor(id){
        this.id = id;
        this.headerId = `${id}Header`;
        this.bodyId = `${id}Body`
    }

    makeTheTableAndButtons(head, button = ""){
        dashboardContainer.innerHTML = this.makeTableTemplate(button);
        const table = document.getElementById(`${this.headerId}`)
        table.innerHTML = head
        this.back();
    }

    chooseOptions(value) {
        const modifyPanel = modifyPanelMap[value];
        if (!Dashboard) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new modifyPanel("add");
    }

    back(){
        document.getElementById("back").onclick = () => {
            dashboardContainer.classList.toggle('hide');
            dashboardContainer.innerHTML = '';
            modifyPanel.classList.toggle('hide');
            modifyPanel.innerHTML = '';
            mainPanel.classList.toggle('hide');
        }
    }

    makeTableTemplate(button){
        return `    
            <div id=${this.id}Dashboard>
                <table >
                    <thead id=${this.headerId}></thead>
                    <tbody id=${this.bodyId}></tbody> 
                </table>
            </div> 
            <div>
                ${button}
                <button id="back">Back</button>
            </div> 
        `
    }
}
