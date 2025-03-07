'use client'

import React, { useEffect, useState } from "react";
import Post from "../../../components/post";
import Comment from "../../../components/comment";
import { getPosts, getReplies, reply } from "../../actions";
import { useParams } from 'next/navigation'
import dynamic from "next/dynamic";

// Dynamically import QuillForm with ssr: false to disable SSR for this component
const QuillForm = dynamic(() => import('@/components/quillform'), { ssr: false });

// Define a type for your route parameters
type RouteParams = {
    slug: string
    // Add other potential parameters here
  }

export default function PostThreadPage() {
  // Using useParams hook to access route parameters synchronously
  const id = useParams<RouteParams>().slug;
  const [post, setPost] = useState<Record<string, any>[]>([]);
  const [replies, setReplies] = useState<Record<string, any>[]>([]);
  const [myReply, setMyReply] = useState('');

  useEffect(() => {
      if (!id) return;

      const fetchPosts = async () => {
          const mainPost = await getPosts(id);
          setPost(mainPost);
          console.log(mainPost);
      };

      const fetchReplies = async () => {
          if (id) {
              const replies = await getReplies(id);
              const sortedReplies = replies.sort((a, b) => new Date(b.reply_date).getTime() - new Date(a.reply_date).getTime());
              setReplies(sortedReplies);
              console.log(replies);
          } else {
              console.error("Post ID is undefined");
          }
      };

      fetchPosts();
      fetchReplies();
  }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    if (!myReply.trim()) {
        alert('Your comment cannot be empty!');
        return;
      }
      e.preventDefault();

    // Optimistically add the new reply to the list of replies
    const newReply = {
        reply_text: myReply,
        reply_likes: 0,
        reply_date: new Date().toISOString(),
        parent_post: id,
      };
      setReplies([newReply, ...replies]); // Immediately add to the UI
      
      const formData = new FormData();
      formData.append('reply_text', myReply);
      if (id) {
          await reply(formData, id);
      } else {
          console.error("Post ID is undefined");
      }
      setMyReply('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="posts-container grid gap-0 sm:grid-cols-1 lg:grid-cols-1 mt-0">
          {post.map((post, index) => (
              <Post
                  key={index}
                  title={post.post_title}
                  text={post.post_text}
                  like_count={post.like_count}
                  reply_count={post.reply_count}
                  date={new Date(post.post_date).toLocaleString()}
                  id={post.post_id} />
          ))}
          <form onSubmit={handleReply}>
              <div>
              <label htmlFor="your_reply">Comment:</label>
              <QuillForm value={myReply} onChange={setMyReply} />
              <button type="submit">Submit</button>
              </div>
          </form>
          {replies.map((reply, index) => (
              <Comment
                  key={index}
                  text={reply.reply_text}
                  like_count={reply.reply_likes}
                  date={new Date(reply.reply_date).toLocaleString()}
                  id={reply.parent_post} />
          ))}
      </div>
    </div>
  );

}