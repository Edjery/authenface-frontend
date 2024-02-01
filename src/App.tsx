import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={`"header header" "nav main" "nav footer"`}
      gridTemplateColumns={"150px 1fr"}
      gap="1"
    >
      <GridItem pl="2" area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
        <Box>Hello World</Box>
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
