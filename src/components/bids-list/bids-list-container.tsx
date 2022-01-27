import React from "react";
import { Bid, useBidsQuery } from "../../data-layer/graphql-types";
import { processBids } from "./bids-list-helper";
import { BidsListRenderer } from "./bids-list-renderer";

export const BidsTableContainer = 
  React.memo(() => {
    const { loading, error, data } = useBidsQuery({
      variables: {
        path: "bids"
      }
    })
    const [activeBids, setActiveBids] = React.useState<Bid[] | undefined>();
    const [expiredBids, setExpiredBids] = React.useState<Bid[] | undefined>();
    React.useEffect(() => {
      const { activeBids, expiredBids } = processBids(data?.bids);
      setActiveBids(activeBids);
      setExpiredBids(expiredBids);
    }, [data, loading, error]);

    return (
      <BidsListRenderer
        activeBids={activeBids}
        expiredBids={expiredBids}
        loading={loading}
        error={!!error}
      />
    );
  });
