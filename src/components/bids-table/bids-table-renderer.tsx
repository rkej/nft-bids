import React from "react";
import {
  Accordion,
  Card,
  Container,
  Dimmer,
  Divider,
  Icon,
  Label,
  Loader,
  List,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import {
  IBidsTable,
  IBidsTableBody,
  IBidsTableRenderer,
} from "./bids-table.interface";
import { FixedSizeList } from "react-window";

export const BidsTableRenderer: React.FC<IBidsTableRenderer> = React.memo(
  ({ activeBids, expiredBids, error, loading }) => {
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
            content: (
              <BidsList
                loading={loading}
                bids={expiredBids}
                icon="exclamation circle"
              />
            ),
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
        {!loading ? <Accordion defaultActiveIndex={0} panels={panels} /> : <LoaderComponent />}

      </Card>
    );
  }
);

const BidsList: React.FC<IBidsTable> = ({ bids, icon, loading }) => {
  console.log(loading);
  return (
    <Container style={{ width: "60rem" }}>
      {!!bids?.length && !loading && (
        <FixedSizeList
          height={960}
          width={960}
          itemSize={60}
          itemData={bids}
          itemCount={bids?.length || 0}
        >
          {BidsListRow}
        </FixedSizeList>
      )}
      {!bids?.length && !loading && (
        <Message
          header="No bids at this time"
          content="Please check again later."
        />
      )}
    </Container>
  );
};

const BidsListRow = React.memo(
  ({ index, data, style }: { index: any; data: any; style: any }) => {
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
const LoaderComponent = React.memo(() => (
  <Segment style={{height: "60rem"}}>
    <Dimmer active inverted>
      <Loader inverted content="loading" />
    </Dimmer>
  </Segment>
));
