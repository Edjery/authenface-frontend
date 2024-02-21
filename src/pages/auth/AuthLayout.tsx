import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

const AuthLayout = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Grid
        templateAreas={`"header header header" "leftSide main rightSide"`}
        gridTemplateRows={"90px 1fr"}
        gridTemplateColumns={"700px 1fr 700px"}
        rowGap="10"
      >
        <GridItem
          pl="2"
          area={"header"}
          bg={colorMode === "dark" ? "blue.900" : "blue.200"}
        >
          <NavBar />
        </GridItem>
        <GridItem
          pl="2"
          area={"main"}
          bg={colorMode === "dark" ? "blue.800" : "blue.100"}
        >
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default AuthLayout;
