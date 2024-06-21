import sql from "better-sqlite3";

export interface IPost {
  id: string;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
}

const db = new sql("posts.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER,
      post_id INTEGER,
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);
  // Create two dummy users if they don't exist already
  const stmt = db.prepare<[], { count: number }>(
    "SELECT COUNT(*) AS count FROM users",
  );
  if (stmt.get()?.count === 0) {
    db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('John', 'Doe', 'john@example.com')
  `);
    db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Mustafa', 'Hayati', 'mustafa@gmail.com')
  `);
  }
}

initDb();

export async function getPosts(maxNumber?: number) {
  let limitClause = "";
  if (maxNumber) {
    limitClause = "LIMIT ?";
  }
  const stmt = db.prepare<
    [number?],
    {
      id: string;
      image: string;
      title: string;
      content: string;
      createdAt: string;
      userFirstName: string;
      userLastName: string;
      likes: number;
      isLiked: boolean;
    }
  >(`
    SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}`);

  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export async function storePost(post: {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}) {
  const stmt = db.prepare<[string, string, string, number], null>(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);
  return stmt.run(post.imageUrl, post.title, post.content, post.userId);
}

export async function updatePostLikeStatus(postId: number, userId: number) {
  const stmt = db.prepare<[number, number], { count: number }>(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  const isLiked = stmt.get(userId, postId)?.count === 0;

  if (isLiked) {
    const stmt = db.prepare<[number, number], null>(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);
    return stmt.run(userId, postId);
  } else {
    const stmt = db.prepare<[number, number], null>(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);
    return stmt.run(userId, postId);
  }
}