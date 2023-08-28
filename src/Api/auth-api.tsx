import { GetCaptchaUrlResponseType } from "../components/types/types";
import { instance } from "./api";

export const authAPI = {
  logout() {
    instance.delete(`auth/login`);
  },

  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
      .then((res) => res.data);
  },
};
