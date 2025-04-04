"use client";

import React, { useEffect, useState } from "react";
import Post from "../../../components/post";
import Comment from "../../../components/comment";
import { getPosts, getReplies, reply } from "../../actions";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { NicknameContext } from "@/context/context";
import { useContext } from "react";

// Dynamically import QuillForm with ssr: false to disable SSR for this component
const QuillForm = dynamic(() => import("@/components/quillform"), {
  ssr: false,
});

// Define a type for your route parameters
type RouteParams = {
  slug: string;
  // Add other potential parameters here
};

export default function PostThreadPage() {
  // Using useParams hook to access route parameters synchronously
  const postID = useParams<RouteParams>().slug;
  const [post, setPost] = useState<Record<string, any>[]>([]);
  const [replies, setReplies] = useState<Record<string, any>[]>([]);
  const [myReply, setMyReply] = useState("");
  const nicknameContext = useContext(NicknameContext);
  const [nickname, setNickname] = useState(nicknameContext?.nickname || "");

  useEffect(() => {
    if (nicknameContext?.nickname && nickname === "") {
      setNickname(nicknameContext.nickname);
    }
  }, [nicknameContext?.nickname]); // Sync nickname from context

  useEffect(() => {
    if (!postID) return;

    const fetchPosts = async () => {
      const mainPost = await getPosts(postID);
      setPost(mainPost);
      console.log(mainPost);
    };

    const fetchReplies = async () => {
      if (postID) {
        const replies = await getReplies(postID);
        const sortedReplies = replies.sort(
          (a, b) =>
            new Date(b.reply_date).getTime() - new Date(a.reply_date).getTime()
        );
        setReplies(sortedReplies);
      } else {
        console.error("Post ID is undefined");
      }
    };

    fetchPosts();
    fetchReplies();
  }, [postID]);

  const isValidReply = (reply: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(reply, "text/html");
    const textContent = doc.body?.textContent?.trim() || "";
    return /[A-Za-z0-9]/.test(textContent);
  };

  const handleReply = async (e: React.FormEvent) => {
    console.log("handleReply + " + myReply);
    if (!isValidReply(myReply)) {
      alert("Your comment cannot be empty!");
      return;
    }
    e.preventDefault();

    if (nicknameContext) {
      nicknameContext.setNickname(nickname); // Set nickname in context
    }

    // Optimistically add the new reply to the list of replies
    const newReply = {
      reply_text: myReply,
      reply_likes: 0,
      reply_date: new Date().toISOString(),
      parent_post: postID,
      author: nickname,
    };
    setReplies([newReply, ...replies]); // Immediately add to the UI

    const formData = new FormData();
    formData.append("reply_text", myReply);
    if (postID) {
      await reply(formData, postID, nickname);
    } else {
      console.error("Post ID is undefined");
    }
    setMyReply("");
    console.log(myReply);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20">
      <div className="grid gap-1 sm:grid-cols-1 lg:grid-cols-1 mt-0 pt-4">
        {post.map((post, index) => (
          <Post
            key={index}
            title={post.post_title}
            text={post.post_text}
            like_count={post.like_count}
            reply_count={post.reply_count}
            date={new Date(post.post_date).toLocaleString()}
            id={post.post_id}
            author={post.author}
          />
        ))}
        <form onSubmit={handleReply} className="z-0">
          <div>
            <div>
              <label htmlFor="nickname">Nickname:</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={nicknameContext?.nickname || "Anonymous"}
                required
              />
            </div>
            <label htmlFor="your_reply">Comment:</label>
            <QuillForm value={myReply} onChange={setMyReply} />
            <div className="pt-1">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
        <div>
        {replies.map((reply, index) => (
          <Comment
            key={index}
            text={reply.reply_text}
            like_count={reply.reply_likes}
            date={new Date(reply.reply_date).toLocaleString()}
            reply_id={reply.reply_id}
            author={reply.author}
          />
        ))}
        </div>
      </div>
    </div>
  );
}
