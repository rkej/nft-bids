import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { calculateTimeDifference, hasExpired } from "./helpers";
import { BidsTableContainer } from "./components/bids-table/bids-table-container";

const restLink = new RestLink({
  uri: "https://nft-fe-hiring.vercel.app/api/",
  responseTransformer: async (response) => {
    return response.json().then((data: any) =>
      data.bids.map(
        (bid: {
          expiration: number;
          createdAt: number;
          id: any;
          price: any;
        }) => {
          const isActive = !hasExpired(bid.expiration);
          const expiryTime = calculateTimeDifference(bid.expiration);
          const creationTime = calculateTimeDifference(bid.createdAt);
          return {
            id: bid.id,
            price: bid.price,
            isActive,
            expiryTime,
            creationTime,
            createdAt: bid.createdAt,
            expiration: bid.expiration,
          };
        }
      )
    );
  },
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BidsTableContainer />
    </ApolloProvider>
  );
}

export default App;
