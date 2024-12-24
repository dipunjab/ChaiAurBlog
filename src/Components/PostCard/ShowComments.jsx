import React, { useEffect, useState } from 'react';
import commentService from '../../Appwrite/comment';

function ShowComments({ close, postID }) {
  const [allComments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setLoading(true)
        const comments = await commentService.getCommentsByPost({ postID });
        // console.log(comments);
        setComments(comments.documents);
      } catch (error) {
        console.log("Error Comment", error);
        setLoading(false)
      } finally {
        setLoading(false)
      }
    };
    fetchComment();
  }, [postID]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">All Comments</h1>
        </div>
        {loading ? <p>Loading....</p>:
        <div className="px-4 py-2 max-h-80 overflow-y-auto">
          {allComments ? (
            allComments.map((comment) => (
              <div
              key={comment.$id}
              className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-700">
                  {comment.userName || 'Anonymous'} {/* Adjust if `username` field exists */}
                </p>
                <p className="text-sm text-gray-600">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments</p>
          )}
        </div>
        }

        <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={close}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowComments;
