import { Button, HStack, Heading } from "@chakra-ui/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <HStack mt={5} mx={10} justifyContent="space-between">
      <Link to="/">
        <Heading>AuthenFace</Heading>
      </Link>
      <HStack>
        <ColorModeSwitch />
        {isAuthenticated() && (
          <Button onClick={handleLogout} colorScheme="red" mx={10}>
            Logout
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default NavBar;
