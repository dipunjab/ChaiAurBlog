import conf from "./conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

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

    async updateUserInfo({newEmail, newName, newPassword, newPFP, currentPassword}) {
        try {
            if (newName) {
              await this.account.updateName(newName);
              console.log('Name updated successfully');
            }
        
            if (newEmail && currentPassword) {
              await this.account.updateEmail(newEmail);
              console.log('Email updated successfully');
            }
        
            if (newPassword && currentPassword) {
              await this.account.updatePassword(newPassword, currentPassword);
              console.log('Password updated successfully');
            }
        
            if (newPFP) {
              await this.account.updatePrefs({profilePicture: newPFP});
              console.log('ProfilePicture updated successfully');
            }
          } catch (error) {
            console.error('Error updating user details:', error.message);
          }
        
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("User login Failed: ", error);
            throw new Error(error.message)
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
