import {$authHost, $host} from "./index";


// const addToCart = async (userId, deviceId, quantity) => {
//   const defaultQuantity = 1;
//
//   try {
//     const response = await $authHost.post('http://localhost:5000/api/basket', {
//       userId,
//       deviceId,
//       quantity: quantity || defaultQuantity,
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const addToBasket = async (formData) => {
  const {data} = await $authHost.post('http://localhost:5000/api/basket', formData);
  return data;
};

export const getBasket = async () => {
  const {data} = await $authHost.get('http://localhost:5000/api/basket')
  return data
}

export const removeFromBasket = async (formData) => {
  const {data} = await $authHost.delete('http://localhost:5000/api/basket', formData);
  return data;
}