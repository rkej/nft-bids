import { Bid } from "../../graphql-types";

export interface IBidsTableRenderer {
  activeBids: Bid[] | undefined;
  expiredBids: Bid[] | undefined;
  error: boolean;
  loading: boolean;
}

export interface IBidsTable {
  bids: Bid[] | undefined;
  icon: string;
}

export interface IBidsTableBody {
  bid: Bid;
  icon: string;
}
