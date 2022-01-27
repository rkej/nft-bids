import { Bid } from "../../data-layer/graphql-types";

export interface IBidsTableRenderer {
  activeBids: Bid[] | undefined;
  expiredBids: Bid[] | undefined;
  error: boolean;
  loading: boolean;
}

export interface IBidsList {
  bids: Bid[] | undefined;
  icon: string;
}

export interface IBidsTableBody {
  bid: Bid;
  icon: string;
}

export interface IEdgeCaseComponent {
  loading: boolean;
  error: boolean;
}