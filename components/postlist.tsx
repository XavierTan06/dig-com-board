"use client";

import Post from "./post";

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col w-full">
      {posts.map((post, index) => (
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
    </div>
  );
}
