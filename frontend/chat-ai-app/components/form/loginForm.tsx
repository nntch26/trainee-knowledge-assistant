"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  username: string;
  password: string;
};

export function LoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data.username, data.password);

    if (!result.success) {
      setError("root", {
        message: "Invalid username or password",
      });
    }
  };

  return (
    <>
     <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/*  Error */}
            {errors.root && (
              <p className="text-sm text-red-500">
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
    </>

  );
}