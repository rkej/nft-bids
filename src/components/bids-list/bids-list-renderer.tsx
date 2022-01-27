import React from "react";
import {
  Accordion,
  Card,
  Container,
  Dimmer,
  Label,
  Loader,
  List,
  Message,
  Segment,
  Form,
  Divider,
} from "semantic-ui-react";
import {
  IBidsList,
  IBidsListRenderer,
  IEdgeCaseComponent,
  SortKey,
} from "./bids-list.interface";
import { areEqual, FixedSizeList } from "react-window";
import {
  handleBigIntSort,
  handleCreationSort,
  handleExpirationSort,
} from "./bids-list-helper";
import memoize from "memoize-one";
import { Bid } from "../../data-layer/graphql-types";

export const BidsListRenderer: React.FC<IBidsListRenderer> = React.memo(
  ({ activeBids, expiredBids, error, loading }) => {
    const [sortBy, setSortBy] = React.useState("Price");
    const [actBids, setActBids] = React.useState(activeBids);
    const [expBids, setExpBids] = React.useState(expiredBids);

    React.useEffect(() => {
      setActBids(activeBids);
      setExpBids(expiredBids);
    }, [activeBids, expiredBids]);

    const handleSortByChange = React.useCallback(
      (e: React.SyntheticEvent, data) => {
        setSortBy(data.value);
        switch (data.value) {
          case SortKey.Price: {
            // we need to create a duplicate array because PureComponent within the
            // react-window's list ends up thinking that the sorted array was the same array previously
            if (!!activeBids) {
              const sortedBids = [...activeBids].sort(handleBigIntSort);
              setActBids(sortedBids);
            }
            if (!!expiredBids) {
              const sortedExpiredBids = [...expiredBids].sort(handleBigIntSort);
              setExpBids(sortedExpiredBids);
            }
            break;
          }
          case SortKey.Creation: {
            if (!!activeBids) {
              const sortedBids = [...activeBids].sort(handleCreationSort);
              setActBids(sortedBids);
            }
            if (!!expiredBids) {
              const sortedExpiredBids = [...expiredBids].sort(
                handleCreationSort
              );
              setExpBids(sortedExpiredBids);
            }
            break;
          }
          case SortKey.Expiration: {
            if (!!activeBids) {
              const sortedBids = [...activeBids].sort(handleExpirationSort);
              setActBids(sortedBids);
            }
            if (!!expiredBids) {
              const sortedExpiredBids = [...expiredBids].sort(
                handleExpirationSort
              );
              setExpBids(sortedExpiredBids);
            }
            break;
          }
        }
      },
      [activeBids, expiredBids]
    );
    const sortOptions = React.useMemo(
      () => [
        {
          key: SortKey.Price,
          text: "Price",
          value: SortKey.Price,
        },
        {
          key: SortKey.Creation,
          text: "Created at",
          value: SortKey.Creation,
        },
        {
          key: SortKey.Expiration,
          text: "Expiration time",
          value: SortKey.Expiration,
        },
      ],
      []
    );
    const panels = React.useMemo(
      () => [
        {
          key: "active-bids",
          title: {
            content: <Label content="Active bids" />,
          },
          content: {
            content: <BidsList key="active" bids={actBids} loading={loading} />,
          },
        },
        {
          key: "expired-bids",
          title: {
            content: <Label content="Expired bids" color="red" />,
          },
          content: {
            content: (
              <BidsList key="expired" bids={expBids} loading={loading} />
            ),
          },
        },
      ],
      [actBids, expBids, loading]
    );
    return (
      <Card
        centered
        style={{
          width: "65rem",
          marginTop: "10px",
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
      >
        <Card.Content header="NFT Bids" />
        <Card.Content>
          <Form style={{ width: "20rem" }}>
            <Form.Field>
              <label>Sort by: </label>
              <Form.Dropdown
                compact
                selection
                options={sortOptions}
                onChange={handleSortByChange}
                value={sortBy}
              />
            </Form.Field>
          </Form>
        </Card.Content>

        {!loading && !error && (
          <Accordion defaultActiveIndex={0} panels={panels} />
        )}
        {(loading || error) && (
          <EdgeCaseComponent loading={loading} error={error} />
        )}
      </Card>
    );
  }
);

const BidsList: React.FC<IBidsList> = React.memo(({ bids, loading }) => {
  const createItemData = memoize((bids) => ({
    bids,
  }));
  const itemData = createItemData(bids);
  console.log(itemData);
  return (
    <Container style={{ width: "60rem" }}>
      {!!bids?.length && (
        <FixedSizeList
          height={900}
          width={872}
          itemSize={60}
          itemData={itemData}
          itemCount={bids.length}
          itemKey={(index, data) => data.bids[index].id}
        >
          {BidsListRow}
        </FixedSizeList>
      )}
      {!bids?.length && !loading && (
        <Message
          header="No bids at this time"
          content="Please check again later."
          style={{ marginBottom: "10px" }}
        />
      )}
    </Container>
  );
});

const BidsListRow = React.memo(
  ({
    index,
    data,
    style,
  }: {
    index: number;
    data: { bids: Bid[] };
    style: any;
  }) => {
    const { bids } = data;
    return (
      <List style={style} key={bids[index].id}>
        <List.Item>
          <List.Icon
            name={bids[index].isActive ? "ethereum" : "exclamation circle"}
            color={!bids[index].isActive ? "red" : undefined}
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header as="a">{bids[index].price}</List.Header>
            <List bulleted horizontal>
              <List.Item>Created {bids[index].creationTime}</List.Item>
              <List.Item style={{ color: "red" }}>
                {bids[index].isActive ? "Expiring" : "Expired"}{" "}
                {bids[index].expiryTime}
              </List.Item>
            </List>
          </List.Content>
        </List.Item>
      </List>
    );
  },
  areEqual
);

const EdgeCaseComponent: React.FC<IEdgeCaseComponent> = React.memo(
  ({ loading, error }) => (
    <Segment style={{ height: "60rem" }}>
      {loading && (
        <Dimmer active inverted>
          <Loader inverted content="loading" />
        </Dimmer>
      )}
      {error && (
        <Message
          header="We faced an issue while fetching your bids"
          content="Please try again later."
          color="red"
          style={{ marginBottom: "10px" }}
        />
      )}
    </Segment>
  )
);
