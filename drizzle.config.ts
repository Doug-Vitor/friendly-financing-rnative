import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
});
