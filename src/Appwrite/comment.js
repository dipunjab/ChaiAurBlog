import conf from "./conf";
import { Client, Databases , ID, Query} from "appwrite";

export class CommentService{
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createComment({postID, userID, content}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                {
                    content,
                    postID,
                    userID
                }
            )
        } catch (error) {
            console.log("Failed to create comment:: appwrite ", error)
        }
    };

    async deleteComment({commentID}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentID
            )
            return true
        } catch (error) {
            console.log("Failed to delete comment:: appwrite ", error)
        }
    };

    async getCommentsByPost({postID}){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                [
                    Query.equal("postID", postID)
                ]
            )
        } catch (error) {
            console.log("Failed to Get comments :: appwrite ", error);
        }
    };    
}

const commentService = new CommentService()
export default commentService