import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import IUserData from "../pages/auth/interface/IUserData";
import IDataResponse from "../services/interfaces/IDataResponse";
import IWebsite from "../services/interfaces/IWebsite";
import websiteService from "../services/websiteService";
import ConfirmationModal from "./ConfirmationModal";
import WebsiteFormModal from "./WebsiteFormModal";
import ItemAmountInput from "./common/ItemAmountInput";

const Websites = () => {
  const auth = useAuthUser<IUserData>();
  const userId = auth?.id !== undefined ? auth.id : undefined;

  const [totalData, setTotalData] = useState<number>(0);
  const [hasNext, setHasNext] = useState<string | null>(null);
  const [hasPrev, setHasPrev] = useState<string | null>(null);
  const [data, setData] = useState<IWebsite[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentWebsiteId, setCurrentWebsiteId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IDataResponse = await websiteService.getAllWithPage(
          userId,
          currentPage,
          pageSize
        );

        setTotalData(data.count);
        setHasNext(data.next);
        setHasPrev(data.previous);
        setData(data.results);

        console.log("Successfully Fetched Data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, totalData]);

  const handlePageSize = (_: string, value: number) => {
    setPageSize(value);
  };

  const handleWebsiteForm = (websiteId: number | undefined) => {
    setCurrentWebsiteId(websiteId);
    setFormOpen(true);
  };

  const handleWebsiteClose = () => {
    setCurrentWebsiteId(undefined);
    setFormOpen(false);
  };

  const handleSubmit = async (formData: IWebsite) => {
    if (!formData.id) await websiteService.create(formData);
    else await websiteService.update(formData.id, formData);
    setTotalData((prev) => prev + 1);
  };

  const handleDeleteConfirm = (websiteId: number | undefined) => {
    setCurrentWebsiteId(websiteId);
    setConfirmOpen(true);
  };

  const handleDeleteWebsite = async () => {
    if (currentWebsiteId !== undefined)
      await websiteService.remove(currentWebsiteId);
    setCurrentWebsiteId(undefined);
    setConfirmOpen(false);
    setTotalData((prev) => prev - 1);
  };

  return (
    <>
      <Box m="auto" mx={10} mt={10}>
        <HStack justifyContent="space-between">
          <Button onClick={() => handleWebsiteForm(currentWebsiteId)}>
            Add Website
          </Button>
          <HStack>
            <Text>Page Size</Text>
            <ItemAmountInput pageSize={pageSize} onChange={handlePageSize} />
          </HStack>
        </HStack>

        <Table variant="simple" my={10}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>
                  <Stack direction="row" spacing={10} justify={"flex-end"}>
                    <Button
                      leftIcon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => handleWebsiteForm(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDeleteConfirm(item.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          isDisabled={hasPrev === null}
          mr={10}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          isDisabled={hasNext === null}
        >
          Next Page
        </Button>
      </Box>

      <WebsiteFormModal
        isOpen={formOpen}
        onClose={handleWebsiteClose}
        userId={userId}
        websiteId={currentWebsiteId}
        onSubmit={handleSubmit}
      />

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteWebsite}
      />
    </>
  );
};

export default Websites;
