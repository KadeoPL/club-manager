import React from "react";
import LoginForm from "@/components/ui/loginForm";

export default function page() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-primary">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
