import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";

const AuthLayout = () => {
  const { colorMode } = useColorMode();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Grid
        templateAreas={`"header header header" "leftSide main rightSide"`}
        gridTemplateRows={"90px 1fr"}
        gridTemplateColumns={"100px 1fr 100px"}
        rowGap="10"
      >
        <GridItem
          pl="2"
          area={"header"}
          bg={colorMode === "dark" ? "blue.900" : "blue.200"}
        >
          <NavBar />
        </GridItem>
        <GridItem pl="2" area={"main"} display="flex" justifyContent="center">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default AuthLayout;
