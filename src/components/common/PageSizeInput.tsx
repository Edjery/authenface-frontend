import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface Props {
  pageSize: number;
  onChange: (textValue: string, intValue: number) => void;
}

const PageSizeInput = ({ pageSize, onChange }: Props) => {
  return (
    <NumberInput value={pageSize} onChange={onChange} maxWidth={20}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default PageSizeInput;
