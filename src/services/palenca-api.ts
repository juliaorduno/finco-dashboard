import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { LoginPayload, LoginResponse, TransactionsResponse } from "./types";

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function tokenReceived(data: { access_token: string }) {
  localStorage.setItem("access_token", data.access_token);
}

function loggedOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.open("/login");
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://palenca-test-fe-7c7df2c7ab37.herokuapp.com/api",
  prepareHeaders: (headers) => {
    if (!headers.has("Authorization")) {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        method: "POST",
        url: "token-refresh",
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // @ts-expect-error data is unknown
      tokenReceived(refreshResult.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }
  return result;
};

export const palencaApi = createApi({
  reducerPath: "palencaApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({ method: "POST", url: "login", body: payload }),
    }),
    getTransactions: builder.query<TransactionsResponse, void>({
      query: () => ({
        method: "GET",
        url: "transactions",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetTransactionsQuery } = palencaApi;
