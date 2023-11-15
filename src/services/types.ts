export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface Transaction {
  amount: number;
  currency: string;
  transaction_date: string;
  transaction_id: string;
  item_description: string;
}

export interface TransactionsResponse {
  success: boolean | null;
  error: boolean | null;
  data: {
    account_id: string;
    transactions: Transaction[];
  };
  account_id: string;
}
