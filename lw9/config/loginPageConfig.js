const VALID_USER_DATA = {
    login: 'zzz',
    password: 'zzzzzz'
}

const INVALID_USER_DATA = {
    login: 'z',
    password: 'z'
}


const SUCCESS_MESSAGE = 'Вы успешно авторизованы';

const ERROR_MESSAGE = 'Логин/пароль введены неверно';

module.exports = {VALID_USER_DATA, SUCCESS_MESSAGE, INVALID_USER_DATA, ERROR_MESSAGE};