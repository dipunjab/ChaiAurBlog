import conf from "./conf"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email,password,name)
            if (userAccount) {
                return console.log("Created");
                
            } else {
                return console.log("not created");
                
            }
        } catch (error) {
            console.log("Failed to create Account: ", error);
        }
    };

    async login({email,password}){
        try {
            return await this.account
                             .createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("User login Failed: ", error); 
        }
    };

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Failed to get user: ", error);   
        }
    };

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Failed to logout: ", error)
        }
    };
}

const service = new AuthService()

export default service