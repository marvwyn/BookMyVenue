import axiosInstance from "../../../shared/services/axios";

import { API_ROUTES } from "../../../shared/constants/apiRoutes";

export const fetchAccountApi =
  async () => {

    const response =
      await axiosInstance.get(
        API_ROUTES.ACCOUNT.BASE
      );

    return response.data;
  };