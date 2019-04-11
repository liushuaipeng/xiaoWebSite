import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";
let service = axios.create({
  // baseURL: '', // api的base_url
  timeout: 1000 * 300, // 请求超时时间
  // transformRequest: [
  //   function(data) {
  //     // 做任何你想要的数据转换
  //     return qs.stringify(data);
  //   }
  // ],
  paramsSerializer: params => {
    return qs.stringify(params, { indices: false });
  },
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});
export default async function({ isDev, env, req, store: { commit, state }, redirect }) {
  // request拦截器
  service.interceptors.request.use(
    config => {
      // Do something before request is sent

      return config;
    },
    error => {
      // Do something with request error
      console.log("error", error); // for debug
      Promise.reject(error);
    }
  );

  // response拦截器
  service.interceptors.response.use(
    response => {
      var state = response.data && response.data.state;
      if (state !== 0) {
        Message({
          message: response.data.message,
          type: "error",
          showClose: true
        });
      }
      if (state === 401) {
        commit("updateloginDialogShow", true);
      }
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export const request = service;
