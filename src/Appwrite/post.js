import conf from "./conf"
import { Client, ID, Databases, Query} from "appwrite"

export class Service{
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createPost({content, image, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
                ID.unique(),
                {
                    content,image,status,userID
                }
            )
        } catch (error) {
            console.log("Failed to Create Post: ", error);
        }
    };

    async updatePost(postID, {content, image, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
                postID,
                {
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log("Failed to update Post: ", error);
            
        }
    };

    async deletePost(postID){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwritePostCollectionId,
                    postID
                )
                return true
            } catch (error) {
                console.log("Delete post :: appwrite ", error);
                return false 
            }   
    };

    async getPost(postID){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
                postID
            )
        } catch (error) {
            console.log("Get post :: appwrite ", error);
            return false
        }
    };

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Get posts :: appwrite ", error);
            return false
        }
    };

}

const service = new Service()

export default service