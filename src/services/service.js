// import axios from "axios";
// import { baseUrl } from "./baseUrl";

// export const get = async (route) => {
//   try {
//     let token = localStorage.getItem("token");
//     let response = await axios.get(baseUrl + route, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     return response;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

import axios from "axios";
import { baseUrl } from "./baseUrl";

export const get = async (route) => {
  let token = localStorage.getItem("token");
  return await axios.get(baseUrl + route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const post = async (route, body) => {
  let token = localStorage.getItem("token");
  return await axios.post(baseUrl + route, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
