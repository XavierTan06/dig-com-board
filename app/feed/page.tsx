"use server";

import { getPosts } from "../actions";
import PostList from "@/components/postlist";

export default async function HomePage() {
  // Fetch posts on the server side
  const posts = await getPosts();
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 mt-4">
      <div className="posts-container grid gap-0 sm:grid-cols-1 lg:grid-cols-1 mt-0">
        <PostList posts={sortedPosts} />
      </div>
    </div>
  );
}
