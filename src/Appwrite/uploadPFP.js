import conf from "./conf"
import {Client, ID, Storage } from "appwrite"


export class UploadService {
    client = new Client()
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    };

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketIdProfile,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Profile Picture file ::appwrite :", error);
            return false
        }
    };

    async deleteFile(fileID){
        try {
            return this.storage.deleteFile(
                conf.appwriteBucketIdProfile,
                fileID
            )
        } catch (error) {
            console.log("Profile Picture Delete File :: appwrite ", error);
        }
    }

    async filePreview(fileID){
        return this.storage.getFilePreview(
            conf.appwriteBucketIdProfile,
            fileID
        )
    }
}

const uploadPFPService = new UploadService()

export default uploadPFPService