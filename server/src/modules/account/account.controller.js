import {
    getMyAccountService,
    updateMyAccountService,
  } from "./account.service.js";
  
  import {
    STATUS_CODES,
  } from "../../shared/constants/statusCodes.js";
  
  export const getMyAccount = async (
    req,
    res,
    next
  ) => {
    try {
  
      const account =
        await getMyAccountService(
          req.user.userId
        );
  
      res.status(
        STATUS_CODES.OK
      ).json({
        success: true,
        message: "Account fetched successfully",
        data: account,
      });
  
    } catch (error) {
      next(error);
    }
  };
  
  export const updateMyAccount = async (
    req,
    res,
    next
  ) => {
    try {
  
      const account =
        await updateMyAccountService(
          req.user.userId,
          req.body
        );
  
      res.status(
        STATUS_CODES.OK
      ).json({
        success: true,
        message: "Profile updated successfully",
        data: account,
      });
  
    } catch (error) {
      next(error);
    }
  };