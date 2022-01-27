import { Bid } from "../../data-layer/graphql-types";

export const processBids = (bids: Bid[] | undefined) => {
    const activeBids = bids?.filter((bid) => bid.isActive);
    const expiredBids = bids?.filter((bid) => !bid.isActive);
    return {
        activeBids,
        expiredBids
    }
}

export const handleBigIntSort = (a: Bid, b: Bid) => {
  const intA = BigInt(a.price);
  const intB = BigInt(b.price);
  if (intA < intB) {
    return -1;
  } else if (intA > intB) {
    return 1;
  } else {
    return 0;
  }
};

export const handleCreationSort = (a: Bid, b: Bid) => {
    const intA = BigInt(a.createdAt);
    const intB = BigInt(b.createdAt);
    if (intA > intB) {
      return -1;
    } else if (intA < intB) {
      return 1;
    } else {
      return 0;
    }
  };

  export const handleExpirationSort = (a: Bid, b: Bid) => {
    const intA = BigInt(a.expiration);
    const intB = BigInt(b.expiration);
    if (intA < intB) {
      return -1;
    } else if (intA > intB) {
      return 1;
    } else {
      return 0;
    }
  }