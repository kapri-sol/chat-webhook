# Step 1
# 소스 빌드
FROM node:16 AS builder
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

# Step 2
# 이미지 생성
FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app ./

RUN npm i -g pm2

CMD ["pm2-runtime", "npm run start:prod"]