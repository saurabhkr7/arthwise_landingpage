"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Reply {
  _id: string;
  user: {
    displayname: string;
    username: string;
    profilePicture?: string;
  };
  text: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  user: {
    _id: string;
    displayname: string;
    username: string;
    profilePicture?: string;
  };
  description: string;
  likeCount: number;
  isLiked: boolean;
  replies: Reply[];
  createdAt: string;
}

interface CommentsProps {
  blogId: string;
}

const Comments: React.FC<CommentsProps> = ({ blogId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${blogId}?type=blog`
      );
      const data = await res.json();
      if (data.status === "success") {
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          entityType: "blog",
          entityId: blogId,
          description: newComment,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        setNewComment("");
        fetchComments();
        toast.success("Comment posted successfully");
      } else {
        toast.error(data.message || "Failed to post comment");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!session) {
      toast.error("Please login to like");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        fetchComments();
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-6 text-dark dark:text-white">
        Comments ({comments.length})
      </h3>

      {/* Comment Input */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 rounded-lg border border-border dark:border-dark_border dark:bg-dark_b focus:outline-none focus:border-primary min-h-[100px]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        /*
        <div className="bg-gray-100 dark:bg-dark_b p-4 rounded-lg mb-8 text-center text-gray-600 dark:text-gray-400">
          Please <span className="text-primary font-bold">login</span> to join the conversation.
        </div>
        */
        null
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark_border flex items-center justify-center overflow-hidden">
                  {comment.user.profilePicture ? (
                    <Image
                      src={comment.user.profilePicture}
                      alt={comment.user.displayname}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {comment.user.displayname.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="bg-gray-50 dark:bg-dark_b p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-dark dark:text-white">
                      {comment.user.displayname}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.description}
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-2 ml-2">
                  <button
                    onClick={() => handleLike(comment._id)}
                    className={`flex items-center space-x-1 text-sm ${
                      comment.isLiked ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    <span>{comment.isLiked ? "Liked" : "Like"}</span>
                    <span>({comment.likeCount})</span>
                  </button>
                  {/* Reply button could be added here */}
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 ml-8">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark_border flex items-center justify-center overflow-hidden">
                            {reply.user.profilePicture ? (
                              <Image
                                src={reply.user.profilePicture}
                                alt={reply.user.displayname}
                                width={32}
                                height={32}
                              />
                            ) : (
                              <span className="text-gray-500 text-xs">
                                {reply.user.displayname.charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-grow bg-gray-50 dark:bg-dark_b p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-sm text-dark dark:text-white">
                              {reply.user.displayname}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {format(new Date(reply.createdAt), "MMM dd, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /*
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          */
          null
        )}
      </div>
    </div>
  );
};

export default Comments;
