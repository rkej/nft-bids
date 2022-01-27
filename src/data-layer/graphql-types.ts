import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bid = {
  __typename?: "Bid";
  createdAt: Scalars["Int"];
  creationTime: Scalars["String"];
  expiration: Scalars["Int"];
  expiryTime: Scalars["String"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  price: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  bids: Array<Bid>;
};

export type QueryBidsArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

export type BidsQueryVariables = Exact<{
  path: Scalars["String"];
}>;

export type BidsQuery = {
  __typename?: "Query";
  bids: Array<{
    __typename?: "Bid";
    id: string;
    price: string;
    isActive: boolean;
    expiryTime: string;
    creationTime: string;
    createdAt: number;
    expiration: number;
  }>;
};

export const BidsDocument = gql`
  query bids($path: String!) {
    bids(path: $path) @rest(type: "Bid", path: $path) {
      id
      price
      isActive
      expiryTime
      creationTime
    }
  }
`;

/**
 * __useBidsQuery__
 *
 * To run a query within a React component, call `useBidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBidsQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useBidsQuery(
  baseOptions: Apollo.QueryHookOptions<BidsQuery, BidsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BidsQuery, BidsQueryVariables>(BidsDocument, options);
}
export function useBidsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BidsQuery, BidsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BidsQuery, BidsQueryVariables>(
    BidsDocument,
    options
  );
}
export type BidsQueryHookResult = ReturnType<typeof useBidsQuery>;
export type BidsLazyQueryHookResult = ReturnType<typeof useBidsLazyQuery>;
export type BidsQueryResult = Apollo.QueryResult<BidsQuery, BidsQueryVariables>;
