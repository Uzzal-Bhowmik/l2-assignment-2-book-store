import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () => {
    console.log(`Server is up and running on port: ${config.port}`);
  });
}

// Run main() function
main().catch((error) => {
  console.log(error);
});
