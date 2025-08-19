import { Client } from 'pg';

export async function withPg<T>(fn: (c: Client) => Promise<T>) {
  const client = new Client({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();
  try { return await fn(client); } finally { await client.end(); }
}

export async function fetchLatestResetForEmail(email: string) {
  return withPg(async c => {
    const { rows } = await c.query(
      `SELECT * FROM user_reset_password_config
       WHERE email = $1
       ORDER BY "createdAt" DESC
       LIMIT 1`,
      [email]
    );
    return rows[0];
  });
}
