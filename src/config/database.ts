import mongoose from 'mongoose';

if (process.env.DATABASE_URL === undefined) {
  throw new Error('Missing DATABASE_URL environment variable');
}
mongoose.connect(process.env.DATABASE_URL).then();
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to Database'));
