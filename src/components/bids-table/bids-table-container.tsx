import React from "react";
import { Bid, useBidsQuery } from "../../graphql-types";
import { processBids } from "./bids-table-helper";
import { BidsTableRenderer } from "./bids-table-renderer";

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
      <BidsTableRenderer
        activeBids={activeBids}
        expiredBids={expiredBids}
        loading={loading}
        error={!!error}
      />
    );
  });
