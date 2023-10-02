## Local Setup

1. First copy env file, and fill with required values

```bash
cp .env.example .env.local
```

2. Then, install the dependencies and start the dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. First set the env variables with required values, as mentioned in `.env.example` file

2. Then, install the dependencies and run the build

```bash
npm install
npm run build
```

3. Deploy the `out` folder to any static hosting like S3 or Firebase or Other.
