'use server';

import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

export async function create(formData: FormData) {
  const sql = neon(`${process.env.DATABASE_PROD_URL}`);
  const postId = uuidv4();
  const postTitle = formData.get('post_title');
  const postText = formData.get('post_text');
  const postDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // GMT+8
  await sql(
    'INSERT INTO test_post (post_id, post_title, post_text, like_count, reply_count, post_date) VALUES ($1, $2, $3, $4, $5, $6)',
    [postId, postTitle, postText, 0, 0, postDate]
  );
}

export async function getPosts() {
  const sql = neon(`${process.env.DATABASE_PROD_URL}`);
  const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date, post_id FROM test_post');
  console.log(result);
  return result;
}

export async function incrementLike(postId: string) {
  const sql = neon(`${process.env.DATABASE_PROD_URL}`);
  await sql(
    'UPDATE test_post SET like_count = like_count + 1 WHERE post_id = $1',
    [postId]
  );
}
