# SysWhite's hangout

SysHangout is a simple social network application written in NextJS, it has all the features normal social networks have like commenting, liking, following, etc.

## Index

- [The tech stack](#the-tech-stack)
- [Deploy it yourself](#deploy-it-yourself)

## The tech stack

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Serverless functions](https://vercel.com/docs/serverless-functions/introduction)

## Screenshots
![screenshot of the website](image.png)

## Deploy it yourself

### Via vercel

1. Use the button below to deploy it to vercel

...coming soon...

2. Insert the required environment variables, below an exaple:

```env
POSTGRES_PRISMA_URL="postgres://username:password@hostname/dbname?sslmode=require&pgbouncer=true&connect_timeout=15"

POSTGRES_URL_NON_POOLING="postgres://username:password@hostname/dbname?sslmode=require"
```
TIP: You can create a free PostgreSQL database directly on vercel in the database tab

### With docker (ONLY FOR DEVELOPMENT)

1. Clone the repository

2. Run the following command

```bash
docker-compose up -d
```

3. Visit `http://localhost:3000` in your browser
