FROM node:alpine AS deps







RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile



# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG SECRET_KEY

ENV NODE_ENV production
ENV NEXTAUTH_URL="https://nghiald03.id.vn/"
# ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
# ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
# ENV SECRET_KEY=$SECRET_KEY
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000


CMD ["yarn", "start"]