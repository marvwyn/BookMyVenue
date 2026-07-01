import axiosInstance from "../../../shared/services/axios";

import { API_ROUTES } from "../../../shared/constants/apiRoutes";

export const onboardOwnerApi = async (
  formData
) => {
  
  const response =
    await axiosInstance.post(

      API_ROUTES.OWNER.ONBOARDING,

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );

  return response.data;

};

export const fetchOwnerProfileApi =
  async () => {

    const response =
      await axiosInstance.get(
        API_ROUTES.OWNER.PROFILE
      );

    return response.data;

  };

export const updateOwnerProfileApi =
  async (payload) => {

    const response =
      await axiosInstance.patch(

        API_ROUTES.OWNER.PROFILE,

        payload,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }

      );

    return response.data;

  };