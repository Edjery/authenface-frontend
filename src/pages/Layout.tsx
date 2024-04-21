import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Layout = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Grid
        templateAreas={{
          base: `"header header header " "lside sidebar rside" "lside main rside" "footer footer footer"`,
          lg: `"header header header header" "lside sidebar main rside" "footer footer footer footer"`,
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
          minHeight={{ base: "10vh", lg: "10vh" }}
          bg={colorMode === "dark" ? "blue.900" : "blue.200"}
        >
          <NavBar />
        </GridItem>
        <GridItem
          pl="2"
          minHeight={{ base: "10vh", lg: "70vh" }}
          area={"sidebar"}
          bg={colorMode === "dark" ? "blue.800" : "blue.100"}
        >
          <SideBar />
        </GridItem>
        <GridItem
          pl="2"
          area={"main"}
          minHeight={{ base: "70vh", lg: "70vh" }}
          bg={colorMode === "dark" ? "blue.800" : "blue.100"}
        >
          <Outlet />
        </GridItem>
        <GridItem
          pl="2"
          area={"footer"}
          minHeight={{ base: "10vh", lg: "10vh" }}
          bg={colorMode === "dark" ? "blue.800" : "blue.100"}
        >
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
