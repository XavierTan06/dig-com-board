// filepath: /c:/Users/whats/OneDrive/Desktop/T8/Capstone/dig-com-board/app/actions.ts
'use server';

import { neon } from '@neondatabase/serverless';

export async function create(formData: FormData) {
  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  const comment = formData.get('comment');
  // Insert the comment from the form into the Postgres database
  await sql('INSERT INTO test_post (title, contents) VALUES ($1, $2)', ['post title', comment]);
}