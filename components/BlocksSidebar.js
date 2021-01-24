import {
  useRadioGroup,
  useRadio,
  Input,
  Text,
  IconButton,
  Box,
  VStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { BuilderContext } from "../contexts/builderContext";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px="0.5em"
        py="0.3em"
      >
        <Text fontSize="12px">{props.children}</Text>
      </Box>
    </Box>
  );
}

const Tabs = ({ text, keys }) => {
  const { pushHeading, blocks } = useContext(BuilderContext);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "headingSizes",
    defaultValue: "Medium",
    onChange: console.log,
  });
  const [val, setVal] = useState("");

  const group = getRootProps();
  console.log("block => ", blocks);
  return (
    <VStack spacing={4}>
      <HStack>
        <Input size="sm" value={val} onChange={(e) => setVal(e.target.value)} />
        <IconButton
          onClick={() => pushHeading(val)}
          variant="outline"
          colorScheme="teal"
          size="sm"
          icon={<AddIcon />}
        />
      </HStack>
      {keys === "Heading" || keys === "Input" ? (
        <HStack {...group}>
          {text.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      ) : null}
    </VStack>
  );
};

const MenuItem = ({ data, k }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Text fontSize={16} fontWeight="bold" flex="1" textAlign="left">
          {k}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <VStack mt={2}>
          <Tabs text={data} keys={k} />;
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

const BlocksSidebar = () => {
  const blocks = {
    Heading: ["Small", "Medium", "Large"],
    Input: ["Text", "Email", "Number"],
    RadioGroup: ["Radio Group"],
    CheckboxGroup: ["Chekbox Group"],
    OptionsList: ["Options List"],
  };
  return (
    <Box>
      <VStack h="100%" p={4} borderRadius="lg">
        <Accordion w="100%" allowToggle>
          {Object.keys(blocks).map((key) => {
            return <MenuItem data={blocks[key]} k={key} />;
          })}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default BlocksSidebar;
