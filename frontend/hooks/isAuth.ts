import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export const IsAuth = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  useEffect(() => {
    if (!Cookie.get("jwtID")) {
      router.replace("/auth");
    } else {
      setAuth(true);
    }
  }, [Cookie.get("jwtID")]);
  return auth;
};
