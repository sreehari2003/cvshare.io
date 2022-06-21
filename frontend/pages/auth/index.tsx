import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
const Index = () => {
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
        // if (!bool) throw new Error("Couldn't sign in");
      } catch (e) {
        // alert("could not sign in");
        //CONSOLE
        console.log("failed to login", "user closed the popup");
      }
    };
  };
  return <div>AUTH PAGE</div>;
};

export default Index;
