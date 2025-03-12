'use server';

import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

export async function create(formData: FormData) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const postId = uuidv4();
  const postTitle = formData.get('post_title');
  const postText = formData.get('post_text');
  const postDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // GMT+8
  await sql(
    'INSERT INTO test_post (post_id, post_title, post_text, like_count, reply_count, post_date) VALUES ($1, $2, $3, $4, $5, $6)',
    [postId, postTitle, postText, 0, 0, postDate]
  );
  return postId;
}

export async function reply(formData: FormData, parentPost: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const replyText = formData.get('reply_text');
  const replyDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // GMT+8
  await sql(
    'INSERT INTO test_reply (reply_text, reply_likes, reply_date, parent_post) VALUES ($1, $2, $3, $4)',
    [replyText, 0, replyDate, parentPost]
  );
}

export async function getPosts(id: null | string = null) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  if (id) {
    const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date, post_id FROM test_post WHERE post_id = $1', [id]);
    return result;
  }
  const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date, post_id FROM test_post');
  console.log(result);
  return result;
}

export async function getReplies(id: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql('SELECT reply_text, reply_likes, reply_date FROM test_reply WHERE parent_post = $1', [id]);
  console.log(result);
  return result;
}

export async function incrementLike(postId: string, isReply = false) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  if (isReply) {
    await sql(
      'UPDATE test_reply SET reply_likes = reply_likes + 1 WHERE parent_post = $1',
      [postId]
    );
  }
  else {
    await sql(
      'UPDATE test_post SET like_count = like_count + 1 WHERE post_id = $1',
      [postId]
    );
  }
}

export async function addEvent(
  event_date: string, // Format: YYYY-MM-DD
  start_time: string, // Format: HH:MM:SS
  end_time: string,   // Format: HH:MM:SS
  title: string,
  description: string,
  pax: number
) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const eventID = uuidv4();
  const result = await sql(
    `INSERT INTO events (event_date, start_time, end_time, title, description, pax, event_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [event_date, start_time, end_time, title, description, pax, eventID]
  );
  return result;
}

export async function getEvents() {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const result = await sql(
    `SELECT event_id, event_date, start_time, end_time, title, description, pax FROM events`
  );
  console.log(result);
  // Convert database format to React Big Calendar compatible format
  return result;
}
