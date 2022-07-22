import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../../context/Auth";

const MainNav: React.FC = () => {
  const { logOut, isLoggedIn } = useContext(AuthContext);
  return (
    <Box
      py={3}
      px={9}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading>Cvshare</Heading>
      {isLoggedIn && (
        <Button colorScheme="red" variant="solid" onClick={logOut}>
          Logout
        </Button>
      )}
    </Box>
  );
};

export default MainNav;
