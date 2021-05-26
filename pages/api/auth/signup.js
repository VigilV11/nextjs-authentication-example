import { hashPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input. Password also should be atleast 7 characters long.',
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    // check if the email is that of an existing user
    const existingUser = await db.collection('users').findOne({ email: email });

    // if user exists return
    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      client.close(); // close the database connection
      return;
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user' });
    client.close(); // close the database connection
  }
}

export default handler;
