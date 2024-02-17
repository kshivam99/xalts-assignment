import React from "react";
import GoogleButton from "react-google-button";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Center, Flex, Title } from "@mantine/core";

function Login({
  setIsAuthenticated,
}: {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      //@ts-ignore
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Center maw={"100vw "} h={"100vh"}>
      <Flex direction={"column"}>
        <Center mb={'20px'}>
          <Title c="blue" order={1} fw={700}>
            X
          </Title>
          <Title order={1} fw={700}>
            alts
          </Title>
        </Center>
        <GoogleButton onClick={signInWithGoogle} />
      </Flex>
    </Center>
  );
}

export default Login;
