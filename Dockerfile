FROM node:current

WORKDIR /usr/app

RUN apt-get update && apt-get install -y \
    chromium \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxkbcommon0 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json .

RUN curl -v https://registry.npmjs.com/

RUN npm install --omit=dev

RUN npm ci

COPY . .
