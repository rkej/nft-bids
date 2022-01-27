import { Bid } from "../../data-layer/graphql-types";

export const processBids = (bids: Bid[] | undefined) => {
    const activeBids = bids?.filter((bid) => bid.isActive);
    const expiredBids = bids?.filter((bid) => !bid.isActive);
    return {
        activeBids,
        expiredBids
    }
}