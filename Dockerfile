# Step 1: Install pnpm and dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only lock and package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Step 2: Build the app
FROM node:18-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/package.json ./package.json
COPY . .

RUN pnpm build

# Step 3: Prepare production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]
