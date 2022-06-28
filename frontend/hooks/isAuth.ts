import React, { useEffect } from "react";
import { useRouter } from "next/router";
const IsAuth = () => {
  const router = useRouter();
  return router.push("/auth");
};

export default IsAuth;
