import { DeleteIcon } from "@chakra-ui/icons";
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import IAuthUser from "../pages/auth/interface/IAuthUser";
import IDataResponse from "../services/interfaces/IDataResponse";
import ISnapshot from "../services/interfaces/ISnapshot";
import snapshotService from "../services/snapshotService";
import ClickableImage from "./ClickableImage";
import ConfirmationModal from "./common/ConfirmationModal";
import ItemAmountInput from "./common/ItemAmountInput";
import PaginationControls from "./common/PaginationControls";

const Snapshots = () => {
  const auth = useAuthUser<IAuthUser>();
  const userId = auth?.id !== undefined ? auth.id : undefined;

  const [totalData, setTotalData] = useState<number>(0);
  const [hasNext, setHasNext] = useState<string | null>(null);
  const [hasPrev, setHasPrev] = useState<string | null>(null);
  const [data, setData] = useState<ISnapshot[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentSnapshotId, setCurrentSnapshotId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IDataResponse = await snapshotService.getAllWithPage(
          userId,
          currentPage,
          pageSize
        );
        setTotalData(data.count);
        setHasNext(data.next);
        setHasPrev(data.previous);
        setData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize, totalData]);

  const handlePageSize = (_: string, value: number) => {
    setPageSize(value);
  };

  const handleDeleteConfirm = (snapshotId: number | undefined) => {
    setCurrentSnapshotId(snapshotId);
    setConfirmOpen(true);
  };

  const handleDeleteWebsite = async () => {
    if (currentSnapshotId !== undefined)
      await snapshotService.remove(currentSnapshotId);
    setCurrentSnapshotId(undefined);
    setConfirmOpen(false);
    setTotalData((prev) => prev - 1);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMMM DD YYYY @ hh:mm A");
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <Box m="auto" mx={10} mt={10}>
        <HStack justifyContent="flex-end">
          <HStack>
            <Text>Page Size</Text>
            <ItemAmountInput pageSize={pageSize} onChange={handlePageSize} />
          </HStack>
        </HStack>

        <Table variant="simple" my={10}>
          <Thead>
            <Tr>
              <Th>Snapshot</Th>
              <Th>DateTime Taken</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <ClickableImage src={item.image} alt={item.name} />
                </Td>
                <Td>{formatDate(item.created_at)}</Td>
                <Td>
                  <Stack direction="row" spacing={10} justify={"flex-end"}>
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

        {totalData === 0 ? null : (
          <PaginationControls
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={hasNext}
            hasPrev={hasPrev}
            page={currentPage}
            pageSize={pageSize}
            totalCount={totalData}
          />
        )}
      </Box>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteWebsite}
      />
    </>
  );
};

export default Snapshots;
