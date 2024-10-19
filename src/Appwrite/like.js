import conf from "./conf"
import { Client, ID, Databases, Query } from "appwrite"

export class LikeService {
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async likePost({ userID, postID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,  
                ID.unique(),
                {
                    userID, postID
                }
            )
        } catch (error) {
            console.log("Failed to like post: ", error);
        }
    };

    async unlikePost(likeID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                likeID
            );
            return true;
        } catch (error) {
            console.log("Failed to unlike post: ", error);
            return false;
        }
    };

    async getLikesByPost(postID) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                [Query.equal("postID", postID)]
            );
        } catch (error) {
            console.log("Get likes :: appwrite ", error);
            return false;
        }
    };

    async getUserLikeOnPost(userID, postID) {
        try {
            const likes = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                [Query.equal("userID", userID), Query.equal("postID", postID)]
            );
            return likes.total > 0 ? likes.documents[0] : null;
        } catch (error) {
            console.log("Get user like on post :: appwrite ", error);
            return false;
        }
    }
}

const likeService = new LikeService()

export default likeService
