import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function App() {
  const { colorMode } = useColorMode();

  return (
    <Grid
      templateAreas={`"header header header header" "leftSide nav main rightSide"`}
      gridTemplateRows={"90px 1fr"}
      gridTemplateColumns={"150px 150px 1fr 150px"}
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
        <HomePage />
      </GridItem>
    </Grid>
  );
}

export default App;
