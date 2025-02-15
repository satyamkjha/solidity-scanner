import React, { useEffect } from "react";
import { Flex, FormControl, Text } from "@chakra-ui/react";
import { useAcceptedCoins } from "hooks/usePricing";
import Select from "react-select";
import { customStylesForReactSelect } from "common/stylesForCustomSelect";
import FormatOptionLabel from "components/common/FormatOptionLabel";

const CoinPaymentSelect: React.FC<{
  setCoin: React.Dispatch<React.SetStateAction<string>>;
  coin: string;
}> = ({ setCoin }) => {
  const { data, isLoading } = useAcceptedCoins();
  const [coinList, setCoinList] = React.useState<
    { label: string; value: string; icon: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      let tempArray: { label: string; value: string; icon: string }[] = [];
      Object.keys(data).forEach((key) => {
        tempArray.push({
          value: key,
          label: data[key].name,
          icon: "",
        });
      });
      setCoinList(tempArray);
    }
  }, [data]);

  return (
    <Flex
      mt={5}
      p={5}
      w="100%"
      h="fit-content"
      borderRadius="10px"
      backgroundColor={"#F7F9FC"}
      flexDir={"column"}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <FormControl id="contract_chain">
        <Text ml={1} mb={2} fontSize="md">
          Select Coin
        </Text>
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isDisabled={isLoading}
          options={coinList}
          placeholder="Choose an Option"
          styles={customStylesForReactSelect}
          onChange={(newValue: any) => {
            if (newValue) {
              setCoin(newValue.value);
            }
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default CoinPaymentSelect;
