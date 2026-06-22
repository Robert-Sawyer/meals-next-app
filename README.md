# NextLevel Food

A Next.js demo app for browsing and sharing meals. The app uses SQLite for meal data and uploads submitted images to an AWS S3 bucket.

## Requirements

- Node.js 20 or newer
- npm
- AWS credentials with permission to upload files to the configured S3 bucket

## Installation

Install project dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root and add your AWS configuration:

```env
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

The current image upload bucket is configured in `lib/meals.ts`.

## Database Setup

The app uses a local SQLite database file named `meals.db`.

Initialize the database with sample meals:

```bash
npx tsx initdb.ts
```

This creates the `meals` table if it does not exist and inserts the sample data.

`meals.db` is a local development file and should usually not be committed to Git.

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Useful Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build
- `npm run lint` - run Next.js linting

## Notes

- The SQLite database is stored locally as `meals.db`.
- Uploaded meal images are stored in S3.
- If you change the S3 bucket, update both the upload bucket in `lib/meals.ts` and the image host in `next.config.ts`.
