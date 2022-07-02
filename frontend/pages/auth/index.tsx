import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'
const Index = () => {
  const authFunc = () => {
    //fiebase login code
    const provider = new GoogleAuthProvider();
    const toast = useToast()
    const router = useRouter();
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
        // if (!bool) throw new Error("Couldn't sign in");
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push("/");

      } catch (e) {
        // alert("could not sign in");
        toast({
          title: 'Couldnt create account',
          description: "couldnt complete your request",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    };
  };
  return <div>AUTH PAGE</div>;
};

export default Index;
