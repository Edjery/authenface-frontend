import { Button, HStack, Text } from "@chakra-ui/react";

interface Props {
  onNext: () => void;
  onPrev: () => void;
  hasNext: string | null;
  hasPrev: string | null;
  page: number;
  pageSize: number;
  totalCount: number;
}

const PaginationControls = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  page,
  pageSize,
  totalCount,
}: Props) => {
  const currentEndIndex = Math.min(page * pageSize, totalCount);

  return (
    <HStack spacing={10}>
      <Button onClick={onPrev} isDisabled={hasPrev === null}>
        Previous Page
      </Button>
      <Button onClick={onNext} isDisabled={hasNext === null}>
        Next Page
      </Button>
      <Text>
        Displaying {totalCount === 0 ? 0 : (page - 1) * pageSize + 1} -{" "}
        {currentEndIndex} of {totalCount} items
      </Text>
    </HStack>
  );
};

export default PaginationControls;
