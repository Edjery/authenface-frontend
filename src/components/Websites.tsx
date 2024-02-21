import {
  Box,
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IDataResponse from "../services/interfaces/IDataResponse";
import IWebsite from "../services/interfaces/IWebsite";
import websiteService from "../services/websiteService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmationModal from "./ConfirmationModal";
import WebsiteFormModal from "./WebsiteFormModal";

const Websites = () => {
  const [totalData, setTotalData] = useState<number>(0);
  const [hasNext, setHasNext] = useState<string | null>(null);
  const [hasPrev, setHasPrev] = useState<string | null>(null);
  const [data, setData] = useState<IWebsite[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [currentWebsiteId, setCurrentWebsiteId] = useState<
    number | undefined
  >();
  const [page, releadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IDataResponse = await websiteService.getAllWithPage(
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
  }, [currentPage, pageSize, page]);

  const handleWebsiteForm = (
    userId: number | undefined,
    websiteId: number | undefined
  ) => {
    setCurrentUserId(userId);
    setCurrentWebsiteId(websiteId);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setCurrentUserId(undefined);
    setCurrentWebsiteId(undefined);
    setEditOpen(false);
  };

  const handleSubmit = async (formData: IWebsite) => {
    // Create new website
    if (!formData.id) {
      console.log("creating");
      // TODO add api when the authentication/login has been implemented
    }
    // Edit website
    else {
      console.log("editing");
      await websiteService.update(formData.id, formData);
    }
    releadPage(!page);
  };

  const handleDelete = () => {
    setConfirmOpen(false);
    console.log("Delete Successfully");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <Box mx={10} mt={10}>
        <Button
          onClick={() => handleWebsiteForm(currentUserId, currentWebsiteId)}
        >
          Add Website
        </Button>

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
                      onClick={() => handleWebsiteForm(item.user, item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => setConfirmOpen(true)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handlePrevPage} isDisabled={hasPrev === null} mr={10}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} isDisabled={hasNext === null}>
          Next Page
        </Button>
      </Box>

      <WebsiteFormModal
        isOpen={editOpen}
        onClose={handleEditClose}
        userId={currentUserId}
        websiteId={currentWebsiteId}
        onSubmit={handleSubmit}
      />

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Websites;
