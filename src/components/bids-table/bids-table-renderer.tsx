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
} from "semantic-ui-react";
import {
  IBidsList,
  IBidsTableRenderer,
  IEdgeCaseComponent,
} from "./bids-table.interface";
import { FixedSizeList } from "react-window";
import { Bid } from "../../data-layer/graphql-types";

export const BidsTableRenderer: React.FC<IBidsTableRenderer> = React.memo(
  ({ activeBids, expiredBids, error, loading }) => {
    const sortOptions = React.useMemo(
      () => [
        {
          key: "price",
          text: "Price",
          balue: "price",
        },
        {
          key: "creationTime",
          text: "Created at",
          value: "creationTime",
        },
        {
          key: "expiryTime",
          text: "Expiration time",
          value: "expiryTime",
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
            content: (
              <BidsList key="active" bids={activeBids} icon="etherium" />
            ),
          },
        },
        {
          key: "expired-bids",
          title: {
            content: <Label content="Expired bids" color="red" />,
          },
          content: {
            content: <BidsList bids={expiredBids} icon="exclamation circle" />,
          },
        },
      ],
      [activeBids, expiredBids]
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
        {!loading || !error ? (
          <Accordion defaultActiveIndex={0} panels={panels} />
        ) : (
          <EdgeCaseComponent loading={loading} error={error} />
        )}
        <Card.Content extra>
          <Form>
            <Form.Field inline>
              <label>Sort by: </label>
              <Form.Dropdown
                selection
                options={sortOptions}
              />
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    );
  }
);

const BidsList: React.FC<IBidsList> = ({ bids, icon }) => {
  return (
    <Container style={{ width: "60rem" }}>
      {!!bids?.length && (
        <FixedSizeList
          height={960}
          width={960}
          itemSize={60}
          itemData={bids}
          itemCount={bids.length}
        >
          {BidsListRow}
        </FixedSizeList>
      )}
      {!bids?.length && (
        <Message
          header="No bids at this time"
          content="Please check again later."
          style={{ marginBottom: "10px" }}
        />
      )}
    </Container>
  );
};

const BidsListRow = React.memo(
  ({ index, data, style }: { index: number; data: Bid[]; style: any }) => {
    return (
      <List style={style} key={data[index].id}>
        <List.Item>
          <List.Icon
            name={data[index].isActive ? "ethereum" : "exclamation circle"}
            color={!data[index].isActive ? "red" : undefined}
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header as="a">{data[index].price}</List.Header>
            <List bulleted horizontal>
              <List.Item>Created {data[index].creationTime}</List.Item>
              <List.Item style={{ color: "red" }}>
                {data[index].isActive ? "Expiring" : "Expired"}{" "}
                {data[index].expiryTime}
              </List.Item>
            </List>
          </List.Content>
        </List.Item>
      </List>
    );
  }
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
