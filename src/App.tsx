import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Square,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import MainHomeBody from "./components/MainHomeBody";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function App() {
  const { colorMode } = useColorMode();

  return (
    <Grid
      templateAreas={`"header header" "nav main"`}
      gridTemplateRows={"90px 600px"}
      gridTemplateColumns={"150px 1fr"}
      gap="1"
    >
      <GridItem
        pl="2"
        area={"header"}
        bg={colorMode === "dark" ? "blue.700" : "blue.300"}
      >
        <NavBar />
      </GridItem>
      <GridItem
        pl="2"
        area={"nav"}
        bg={colorMode === "dark" ? "blue.600" : "blue.200"}
      >
        <SideBar />
      </GridItem>
      <GridItem
        pl="2"
        area={"main"}
        bg={colorMode === "dark" ? "blue.600" : "blue.200"}
      >
        <MainHomeBody />
      </GridItem>
    </Grid>
  );
}

export default App;
