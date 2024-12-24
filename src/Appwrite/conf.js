const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), 
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), 
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID), 
    appwriteLikeCollectionId: String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID), 
    appwriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID), 
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
    appwriteBucketIdProfile: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_PROFILE)
 }
 
 export default conf