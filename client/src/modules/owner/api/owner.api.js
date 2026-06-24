import { API_ROUTES } from "../../../shared/constants/apiRoutes";
import axiosInstance from "../../../shared/services/axios";

export const becomePartnerApi = async (payload) => {
  const response = await axiosInstance.post(
    API_ROUTES.USERS.BECOME_A_PARTNER,

    payload,
  );

  return response.data;
};
