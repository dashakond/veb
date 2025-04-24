# Вказуємо базовий образ для Node.js
FROM node:16

# Встановлюємо робочу директорію для додатку
WORKDIR /usr/src/app

# Копіюємо package.json і package-lock.json для інсталяції залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код додатку в контейнер
COPY . .

# Виконуємо компіляцію TypeScript коду
RUN npm run build

# Вказуємо порт, на якому буде працювати додаток
EXPOSE 3000

# Запускаємо додаток
CMD ["npm", "run", "start:prod"]
