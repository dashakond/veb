# Використовуємо базовий образ Node.js
FROM node:16

# Встановлюємо робочу директорію
WORKDIR /usr/src/app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код сервісу
COPY . .

# Відкриваємо порт 5002
EXPOSE 5000

# Запускаємо сервіс
CMD ["npm", "start"]
