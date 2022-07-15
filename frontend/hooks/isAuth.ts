import { useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export const IsAuth = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookie.get("jwtID")) {
      router.replace("/auth");
    }
  }, [Cookie.get("jwtID")]);
  return null;
};
