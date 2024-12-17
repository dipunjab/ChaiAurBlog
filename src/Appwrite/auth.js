import conf from "./conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name, profilePicture }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            await this.account.createEmailPasswordSession(email, password);
            if (profilePicture) {
                await this.account.updatePrefs({ profilePicture });
                console.log("Profile picture ID saved in preferences:", profilePicture);
            }
            await this.account.deleteSessions();

            return userAccount;
        } catch (error) {
            console.log("Failed to create Account: ", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("User login Failed: ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Failed to get user: ", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Failed to logout: ", error);
        }
    }
}

const authService = new AuthService();

export default authService;
