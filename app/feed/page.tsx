"use server";

import { Suspense } from "react";
import { getPosts } from "../actions";
import PostList from "@/components/postlist";

export default async function HomePage() {
  // Fetch posts on the server side
  const posts = await getPosts();
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
  );

  return (
    <div className="p-8">
        <Suspense fallback={<div>Loading...</div>} >
          <PostList posts={sortedPosts} />
        </Suspense>
    </div>
  );
}
