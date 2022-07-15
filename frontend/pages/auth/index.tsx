import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { Button, useToast } from "@chakra-ui/react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { CREATEUSER } from "../../api";
import axios from "axios";


const Index = () => {
  const toast = useToast();
  const router = useRouter();
  // Authentication Function
  const authFunc = () => {
    //fiebase login code
    const provider = new GoogleAuthProvider();
    const getAuth = async () => {
      try {
        const res = await signInWithPopup(auth, provider);
        const data = res.user;
        const query = {
          name: data.displayName,
          email: data.email,
          UID: data.uid,
          image: data.photoURL,
        };
        //sending post req return a boolean
        if (!res.user.emailVerified) throw new Error("Couldn't sign in");
        const apiRes = await axios.post(CREATEUSER, query, {
          withCredentials: true,
        });
        if (!apiRes.data.ok) throw new Error();
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/");
      } catch (e) {
        // alert("could not sign in");
        toast({
          title: "Couldnt create account",
          description: "couldnt complete your request",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    getAuth();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center flex-col">
      <div className="h-[300px] bg-white flex justify-center items-center flex-col w-[350px] rounded-lg">
        <h1 className="font-bold text-[26px] ">Login/Signup</h1>
        <Button
          colorScheme="red"
          className="flex justify-between mt-10"
          leftIcon={<AiFillGoogleCircle />}
          onClick={authFunc}
        >
          <h6>Sign Up With Google</h6>
        </Button>
      </div>
    </div>
  );
};

export default Index;
