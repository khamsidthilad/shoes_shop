import config from "../config/configs";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import CryptoJS from "crypto-js";
import configs from "../config/configs";

export const TOKEN_KEY = `${config.APP_NAME}_TOKEN`;

const api = axios.create({
  baseURL: `${config.ENDPOINT_API}`,
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    config.headers = {
      ...generateHMACsignature(config),
      ...config.headers,
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>>;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // response 200
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError & string) => {
    // response 400+
    if (/401/.test(error)) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.reload();
    }
    const err = (error.response && error.response.data) || error;

    return Promise.reject(err);
  }
);
function generateHMACsignature(config: AxiosRequestConfig) {
  try {
    const headers = {
      "Content-Type": "application/json",
      ctime: +new Date(),
      sig: "",
    };
    let path = config.url || "";
    if (!path.startsWith("/")) path = "/" + path;

    const stringToSign = `${config.method?.toUpperCase() || ""}
  ${headers["Content-Type"]}
  ${headers["ctime"]}
  ${path}
  `;

    headers.sig = CryptoJS.HmacSHA256(
      stringToSign,
      configs.HMAC_SECRET || ""
    ).toString(CryptoJS.enc.Base64);
    return headers;
  } catch (error) {
    console.log("🚫 ERROR generateHMACsignature", error);
  }
}
