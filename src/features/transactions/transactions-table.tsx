import { useMemo, useState } from "react";
import {
  FormControl,
  FormLabel,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { Transaction } from "../../services/types";
import {
  TransactionsState,
  addFavorite,
  removeFavorite,
} from "./transactions-slice";

export function TransactionsTable(props: { data: Transaction[] }) {
  const { data } = props;

  const [filterByFavorites, setFilterByFavorites] = useState(false);

  const dispatch = useDispatch();
  // @ts-expect-error State is not typed
  const state = useSelector((state) => state.transactions) as TransactionsState;
  const { favorites } = state;

  const tableData = useMemo(() => {
    if (!filterByFavorites) return data;

    return data.filter(
      (transaction) => state.favorites[composedId(transaction)]
    );
  }, [filterByFavorites, state, data]);

  return (
    <>
      <FormControl>
        <FormLabel>Filter by favorites</FormLabel>
        <Switch onChange={handleChangeFilter} isChecked={filterByFavorites} />
      </FormControl>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Id</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((transaction) => (
              <Tr key={composedId(transaction)}>
                <Td>
                  <Switch
                    isChecked={!!favorites[composedId(transaction)]}
                    onChange={handleOnAddFavorite(transaction)}
                  />
                </Td>
                <Td>{transaction.transaction_id}</Td>
                <Td>{transaction.transaction_date}</Td>
                <Td>
                  {transaction.amount} {transaction.currency}
                </Td>
                <Td>{transaction.item_description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );

  function handleChangeFilter(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterByFavorites(ev.target.checked);
  }

  function handleOnAddFavorite(transaction: Transaction) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      const shouldAddToFavorite = ev.target.checked;
      const uniqueId = composedId(transaction);
      if (shouldAddToFavorite) {
        dispatch(addFavorite(uniqueId));
      } else {
        dispatch(removeFavorite(uniqueId));
      }
    };
  }
}

function composedId(transaction: Transaction) {
  return transaction.transaction_id + "-" + transaction.transaction_date;
}
