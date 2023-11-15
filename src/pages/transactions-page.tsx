import { Box, Heading, Progress } from "@chakra-ui/react";

import { TransactionsTable } from "../features/transactions/transactions-table";
import { useGetTransactionsQuery } from "../services/palenca-api";

export function TransactionsPage() {
  const result = useGetTransactionsQuery();
  return (
    <Box textAlign="left">
      <Heading fontSize={22} mb="16px">
        Transactions
      </Heading>
      {result.isLoading ? (
        <Progress w="800px" size="xs" isIndeterminate />
      ) : (
        <TransactionsTable data={result.data?.data.transactions ?? []} />
      )}
    </Box>
  );
}
