import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Post from "../components/post";
import Comment from "../components/comment";
import { getPosts, getReplies } from "../actions";

export default function PostPg() {
    const { id } = useParams();
    const [posts, setPosts] = useState<Record<string, any>[]>([]);
    const [replies, setReplies] = useState<Record<string, any>[]>([]);
    
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
            {replies.map((reply, index) => (
                <Comment
                    key={index}
                    text={reply.reply_text}
                    like_count={reply.reply_likes}
                    date={reply.reply_date}
                    id={reply.parent_post} />
            ))}
        </div>
    );
}