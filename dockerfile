# Stage 1: Base Alpine Image
FROM node:20-alpine AS base

# Stage 2: Dependencies Installation
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 3: Source Code & Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry disable කිරීමෙන් build එක වේගවත් වේ
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 4: Production Runner (Lightweight & Secure)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security Best Practice: root user වෙනුවට non-root system user කෙනෙක් යොදාගැනීම
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

# Non-root user එකට permissions මාරු කිරීම
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
