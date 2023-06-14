import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const {data} = await $host.post('http://localhost:5000/api/user/registration', {email, password, role: 'ADMIN'});
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const login = async (email, password) => {
  const {data} = await $host.post('http://localhost:5000/api/user/login', {email, password});
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

// export const check = async () => {
//   const {data} = await $authHost.get('http://localhost:5000/api/user/auth');
//   localStorage.setItem('token', data.token)
//   return jwt_decode(data.token);
// }

export const getUserId = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const { data } = await $authHost.get('http://localhost:5000/api/user/auth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(data); // Вывод данных пользователя в консоль

    // Если в данных есть поле userId, вернуть его
    if (data.userId) {
      return data.userId;
    } else {
      return null; // Вернуть null, если поле userId отсутствует
    }
  } catch (error) {
    // Обработка ошибки запроса или других ошибок
    console.log('Error:', error);
    return null;
  }
};



