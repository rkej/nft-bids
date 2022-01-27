import { Bid } from "../../data-layer/graphql-types";

export interface IBidsListRenderer {
  activeBids: Bid[] | undefined;
  expiredBids: Bid[] | undefined;
  error: boolean;
  loading: boolean;
}

export interface IBidsList {
  bids: Bid[] | undefined;
  loading: boolean;
}

export interface IEdgeCaseComponent {
  loading: boolean;
  error: boolean;
}

export enum SortKey {
  Price = "price",
  Creation = "creationTime",
  Expiration = "expiryTime",
}