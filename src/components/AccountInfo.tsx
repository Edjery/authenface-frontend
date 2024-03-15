import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import IAuthUser from "../pages/auth/interface/IAuthUser";
import IDataResponse from "../services/interfaces/IDataResponse";
import IUser from "../services/interfaces/IUser";
import snapshotService from "../services/snapshotService";
import userService from "../services/userService";
import websiteService from "../services/websiteService";

const AccountInfo = () => {
  const auth = useAuthUser<IAuthUser>();
  const userId = auth?.id !== undefined ? auth.id : undefined;
  const imageSize = 40;

  const [userData, setUserData] = useState<IUser>();
  const [websiteCount, setWebsiteCount] = useState<number>();
  const [snapshotCount, setSnapshotCount] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData: IUser = await userService.get(userId);
        const websiteData: IDataResponse = await websiteService.getAllWithPage(
          userId,
          1,
          1
        );
        const snapshotData: IDataResponse =
          await snapshotService.getAllWithPage(userId, 1, 1);

        setUserData(userData);
        setWebsiteCount(websiteData.count);
        setSnapshotCount(snapshotData.count);

        console.log("Successfully Fetched Data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  const gridColumnCount = useBreakpointValue({ base: 1, sm: 3, md: 4, lg: 5 });

  return (
    <>
      <Box m="auto" mx={10} mt={10}>
        {userData ? (
          <>
            <Grid
              templateAreas={{
                base: `"image" "topLeft" "topRight"
                      "bottomLeft" "bottomRight"`,
                lg: `"image topLeft topRight"
                  "image bottomLeft bottomRight"`,
              }}
              gridTemplateColumns={{
                lg: "150px",
              }}
              gap={5}
            >
              <GridItem area={"image"}>
                <Image
                  alt={userData.name}
                  src={userData.image}
                  boxSize={imageSize}
                  objectFit="cover"
                  borderRadius={30}
                  onClick={openModal}
                  cursor="pointer"
                />
              </GridItem>
              <GridItem area={"topLeft "}>
                <Text>Name: </Text>
                <Heading>{userData.name}</Heading>
              </GridItem>
              <GridItem area={"topRight"}>
                <Text>Website/s Count: </Text>
                <Heading>{websiteCount}</Heading>
              </GridItem>
              <GridItem area={"bottomLeft"}>
                <Text>Email: </Text> <Heading>{userData.email}</Heading>
              </GridItem>
              <GridItem area={"bottomRight"}>
                <Text>Snapshot/s Count: </Text>
                <Heading>{snapshotCount}</Heading>
              </GridItem>
            </Grid>

            <Modal isOpen={isOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent maxW="500">
                <ModalBody>
                  <Box w="100%" h="100%">
                    <Image
                      alt={userData.name}
                      src={userData.image}
                      w="100%"
                      h="100%"
                      objectFit="contain"
                    />
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default AccountInfo;
