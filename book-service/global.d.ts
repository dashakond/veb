declare global {
    namespace Express {
      interface Request {
        user?: any;  // Можна замінити 'any' на конкретний тип, якщо знаєте структуру
      }
    }
  }
  