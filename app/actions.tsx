// filepath: /c:/Users/whats/OneDrive/Desktop/T8/Capstone/dig-com-board/app/actions.ts
'use server';

import { neon } from '@neondatabase/serverless';

export async function create(formData: FormData) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const comment = formData.get('comment');
  await sql('INSERT INTO test_post (title, contents) VALUES ($1, $2)', ['post title', comment]);
}

export async function getPosts() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date FROM test_post');
  console.log(result);
  return result;
}