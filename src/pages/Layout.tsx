import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Layout = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Grid
        templateAreas={{
          base: `"header header header " "lside nav rside" "lside main rside"`,
          lg: `"header header header header" "lside nav main rside"`,
        }}
        gridTemplateRows={"90px 1fr"}
        gridTemplateColumns={{
          base: "20px 1fr 20px",
          lg: "150px 150px 1fr 150px",
        }}
        rowGap="10"
        columnGap="1"
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
          area={"nav"}
          bg={colorMode === "dark" ? "blue.800" : "blue.100"}
        >
          <SideBar />
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

export default Layout;
