FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# รับค่าจาก build args
ARG NEXT_PUBLIC_API_URL
ARG API_BASE_URL

# ตั้งเป็น environment variable ให้ Next.js ใช้ตอน build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_BASE_URL=$API_BASE_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]