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

# Встановлюємо змінну середовища для порту
ENV PORT=5001

# Відкриваємо порт 5001
EXPOSE 5001

# Запускаємо сервіс
CMD ["npm", "run", "start:prod"]
