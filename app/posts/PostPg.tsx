"use client";

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Post from "../components/post";
import Comment from "../components/comment";
import { getPosts, getReplies, reply } from "../actions";

export default function PostPg() {
    const { id } = useParams();
    const [posts, setPosts] = useState<Record<string, any>[]>([]);
    const [replies, setReplies] = useState<Record<string, any>[]>([]);
    const [myReply, setMyReply] = useState('');
    
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts(id);
            setPosts(posts);
            console.log(posts);
        };
        
        const fetchReplies = async () => {
            if (id) {
                const replies = await getReplies(id);
                setReplies(replies);
                console.log(replies);
            } else {
                console.error("Post ID is undefined");
            }
        };

        fetchPosts()
        fetchReplies();
    }, []);

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reply_text', myReply);
        if (id) {
            await reply(formData, id);
        } else {
            console.error("Post ID is undefined");
        }
    };

    return (
        <div className="posts-container grid gap-0 sm:grid-cols-1 lg:grid-cols-1 mt-0">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    title={post.post_title}
                    text={post.post_text}
                    like_count={post.like_count}
                    reply_count={post.reply_count}
                    date={post.date}
                    id={post.post_id} />
            ))}
            <form onSubmit={handleReply}>
                <div>
                    <label htmlFor="reply_text">Text:</label>
                    <textarea
                        id="reply_text"
                        name="reply_text"
                        value={myReply}
                        onChange={(e) => setMyReply(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {replies.map((reply, index) => (
                <Comment
                    key={index}
                    text={reply.reply_text}
                    like_count={reply.reply_likes}
                    date={reply.reply_date} //Error: Objects are not valid as a React child (found: [object Date]). If you meant to render a collection of children, use an array instead.
                    id={reply.parent_post} />
            ))}
        </div>
    );
}