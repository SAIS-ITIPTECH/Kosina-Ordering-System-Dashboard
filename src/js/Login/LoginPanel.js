import { database, getCookie } from "../main.js";

export class LoginPanel{
    constructor(){
        const loginButton = document.getElementById("loginButton");
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        loginButton.onclick = () => {
            this.submit();
        }
    }

    async submit(){
        let data = await database.post("login", {
            "username": this.username.value,
            "password": this.password.value
        });
        
        this.username.value = "";
        this.password.value = "";

        if (data["status"] === "error") {window.alert(`${data["message"]}`);}
        else{
            this.showDashboard()
            this.saveToCookie(data);
        }
    }

    saveToCookie(data){
        document.cookie = `token=${data["token"]}; max-age=${data["expiration"]}; path=/; Secure; SameSite=Strict`;
        document.cookie = `name=${data["name"]}; max-age=${data["expiration"]}; path=/; Secure; SameSite=Strict`;
        document.cookie = `resto=${data["resto"]}; max-age=${data["expiration"]}; path=/; Secure; SameSite=Strict`;
    }

    async checkToken(){
        let data = await database.get("return");
        if (data["status"] === "error") {
            window.alert(`${data["message"]}`);
            
        }
        else{
            this.showDashboard();
        }
    }
    
    showDashboard() {
        const login = document.getElementById("login");
        const username = document.getElementById("user")
        const restoName = document.getElementById("restoName")

        login.classList.add("fade-out");
        setTimeout(() => {
            username.innerText = getCookie("name");
            restoName.innerText = getCookie("resto");
            login.classList.add("hidden");
            document.getElementById("loading").classList.remove("hidden");

            setTimeout(() => {
                document.getElementById("loading").classList.add("hidden");
                const dash = document.getElementById("dashboard");
                dash.classList.remove("hidden");
                dash.classList.add("fade-in");
            }, 800);
        }, 400);
    }
}
