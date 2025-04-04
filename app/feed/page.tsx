"use server";

import { Suspense } from "react";
import { getPosts } from "../actions";
import PostList from "@/components/postlist";
import Link from "next/link";

function CreateButton() {
  return (
    <Link
      href="/create"
      className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition z-0"
    >
      Create a Post
    </Link>
  );
}

export default async function HomePage() {
  // Fetch posts on the server side
  const posts = await getPosts();
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
  );

  return (
    <div className="flex flex-col p-8 items-center gap-5 ">
      <CreateButton/>
        <Suspense fallback={<div>Loading...</div>} >
          <PostList posts={sortedPosts} />
        </Suspense>
    </div>
  );
}
