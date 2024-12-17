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
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Upload file ::appwrite :", error);
            return false
        }
    };

    async deleteFile(fileID){
        try {
            return this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log("Delete File :: appwrite ", error);
        }
    }

     filePreview(fileID){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const uploadService = new UploadService()

export default uploadService