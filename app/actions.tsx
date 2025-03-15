'use server';

import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '@/app/calendar/page';

export async function create(formData: FormData, author: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const postId = uuidv4();
  const postTitle = formData.get('post_title');
  const postText = formData.get('post_text');
  const postDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // GMT+8
  await sql(
    'INSERT INTO test_post (post_id, post_title, post_text, like_count, reply_count, post_date, author) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [postId, postTitle, postText, 0, 0, postDate, author]
  );
  return postId;
}

export async function reply(formData: FormData, parentPost: string, author: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const replyId = uuidv4();
  const replyText = formData.get('reply_text');
  const replyDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // GMT+8
  await sql(
    'INSERT INTO test_reply (reply_text, reply_likes, reply_date, parent_post, reply_id, author) VALUES ($1, $2, $3, $4, $5, $6)',
    [replyText, 0, replyDate, parentPost, replyId, author]
  );
}

export async function getPosts(id: null | string = null) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  if (id) {
    const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date, post_id, author FROM test_post WHERE post_id = $1', [id]);
    return result;
  }
  const result = await sql('SELECT post_title, post_text, like_count, reply_count, post_date, post_id, author FROM test_post');
  console.log(result);
  return result;
}

export async function getReplies(id: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql('SELECT reply_text, reply_likes, reply_date, reply_id, author FROM test_reply WHERE parent_post = $1', [id]);
  console.log(result);
  return result;
}

export async function incrementLike(id: string, isReply = false) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  if (isReply) {
    await sql(
      'UPDATE test_reply SET reply_likes = reply_likes + 1 WHERE reply_id = $1',
      [id]
    );
  } else {
    await sql(
      'UPDATE test_post SET like_count = like_count + 1 WHERE post_id = $1',
      [id]
    );
  }
}

export async function makeEvent(event: Event)
 {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const eventID = uuidv4();
  const start_time = event.start;
  const end_time = event.end;
  const title = event.title;
  const description = event.description;
  const pax = event.participant_count;
  const result = await sql(
    `INSERT INTO events (start_time, end_time, title, description, pax, event_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [start_time, end_time, title, description, pax, eventID]
  );
  return result;
}

export async function getEvents() {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const result = await sql(
    `SELECT start_time, end_time, title, description, pax, event_id FROM events`
  );
  console.log(result);
  // Convert database format to React Big Calendar compatible format
  return result;
}

export async function rsvpEvent(event: Event) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const eventID = event.event_id;
  await sql(
    'UPDATE events SET pax = pax + 1 WHERE event_id = $1',
    [eventID]
  );
}
