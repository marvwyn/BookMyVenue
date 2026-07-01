import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validations/login.validation";

import { useAdminAuth } from "../../../shared/context/AdminAuthContext";
import { adminLoginApi } from "./../services/auth.service";
import { ROUTES } from "../../../shared/constants/routes";

import { showError } from "../../../shared/utils/toast";
const inputClass = `
   w-full
   h-12
   px-4
   rounded-xl
   border
   border-gray-300
   focus:border-red-500
   focus:ring-4
   focus:ring-red-100
   outline-none
   transition
`;

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await adminLoginApi({
        email: data.email,
        password: data.password,
      });


      loginAdmin(response.data.user, response.data.accessToken);

      navigate(ROUTES.ADMIN);
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
      <div>
        <input
          type="email"
          placeholder="Email Address"
          {...register("email")}
          className={inputClass}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={inputClass}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="
                  text-sm
                  text-red-600
                  hover:text-red-700
                  font-medium
               "
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
               w-full
               h-12
               rounded-xl
               bg-red-600
               hover:bg-red-700
               text-white
               font-semibold
               transition
               disabled:opacity-50
            "
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default AdminLoginForm;
