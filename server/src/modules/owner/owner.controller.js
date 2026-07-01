import { uploadImages } from "../../shared/services/storage/storage.service.js";

import { onboardOwnerService } from "./owner.service.js";

import { STATUS_CODES } from "../../shared/constants/statusCodes.js";

import ApiResponse from "../../shared/utils/apiResponse.js";
import ApiError from "../../shared/utils/apiError.js";

export const onboardOwner = async (
  req,
  res,
  next
) => {

  try {

    let imageUrls = [];

    if (req.files?.length) {

      imageUrls =
        await uploadImages(req.files);

    }

    const ownerData = {

      ...req.body,

      images: imageUrls,

    };
    
    if (
      !ownerData.address ||
      !ownerData.city ||
      !ownerData.latitude ||
      !ownerData.longitude
    ) {

      throw new ApiError(

        STATUS_CODES.BAD_REQUEST,

        "Please select a valid venue location."

      );

    }

    const result =
      await onboardOwnerService(

        req.user.userId,

        ownerData

      );

    return res
      .status(STATUS_CODES.CREATED)
      .json(

        new ApiResponse(

          STATUS_CODES.CREATED,

          "Owner onboarded successfully",

          result

        )

      );

  } catch (error) {

    next(error);

  }

};