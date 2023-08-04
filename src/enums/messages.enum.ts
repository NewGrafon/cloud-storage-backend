export enum ExceptionMessages {
  SomethingWrong = 'Что-то произошло не так. Попробуйте перезагрузить страницу.',
  Unauthorized = 'Пользователь не авторизован.',
  Authorized = 'Пользователь уже авторизован!',
}

export enum ResultMessages {
  RegisterSuccessful = 'Регистрация произошла успешно!',
  RegisterReject = 'Пользователь с данным email и/или логином уже существует!',
  LoginSuccessful = 'Авторизация произошла успешно!',
  LoginReject = 'Не получилось авторизоваться. Попробуйте проверить введеные данные.',
}
