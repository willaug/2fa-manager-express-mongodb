import app from './app';

app.listen(process.env.API_PORT, () => {
  console.log(`2FA Manager API is now running on "http://localhost:${process.env.API_PORT}"`);
});
