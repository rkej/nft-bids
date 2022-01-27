# NFT Bids
Hi there! Here's my submission for the coding challenge.
## Setup
Make sure you have the pre-requisites set up - `Node`, `npm` and `yarn` installed. 
1. Clone this repo
2. Run `yarn install` - this will download all of the required packages to run this project. 
3. Run `yarn start` - this will launch the project on `localhost:3000` in your browser. Make sure that port isn't already in use.

We should be good to go! 

## Exploring the codebase
- We use Apollo client to handle our data layer with graphql. The schema and types generated from the query are within `./src/data-layer` folder. 
- Our entry point is App.tsx, this is where we also define an entry point for Apollo client and pass down the client prop using ApolloProvider so that we can perform GraphQL operations from every component within our app. We also do some response transformations within the data layer, so we don't have to do these computations in the rendering layer, on each re-render. The main transformation we do here is to convert dates into '2 hours ago' format using moment.js. 
- Our components are defined in `.src/components` codepath. Currently we only render a bids-list component, so that's the only folder you'll see within. We use [Semantic UI React](https://react.semantic-ui.com/) as our UI framework. 

## Features
- To clearly distinguish between expired and active bids, we use 2 accordions - Active and Expired which render list of bids. 
- Since there are no constraints given for the number of bids we'll be seeing, I have used `react-window` to avoid overloading the DOM and render only necessary list nodes. 
- Using a dropdown above the accordion, we're able to sort the list. I am only showing and sorting price details, creation time and expiry time as I don't believe other values in the response had much meaning to the user. 

Feature-wise, I believe we're complete and here's a screenshot of the list <img width="913" alt="Screen Shot 2022-01-27 at 6 38 50 AM" src="https://user-images.githubusercontent.com/40424270/151381181-5b7ace19-cb35-42a7-93e6-21d098b83c67.png">

## Production ready? I don't think so. Here's why
- I left out unit tests because of the time constraints but that is a must have before we go to production. 
- Perf improvements: There's a lot of perf improvements we can do. We can push more of the filtering and sorting logic to the data layer, so we don't have to sort the list every time a user plays around with the dropdown field. 
- Responsive UI: Due to the time constraint, my components have fixed height and width, this will be painful for users with smaller screens.
- Library Choice: I am especially concerned about using `moment.js`. It might be a bit overkill to use the library instead of writing our own logic to calculate relative times but it works really well for a quick proof of concept. 
- Better design? This design is something that just came up in my head while looking at the requirements but we should work with a UI designer and work with users to see if the UX would fit their needs. We don't want to just be feature complete, we want to make sure the user is keen on engaging with the app. 
- Code readability: I want to refactor the code in bids-list-renderer file and divide it into multiple files for each component that exists in the file to make it more readable.
- Bugs? This is unreviewed code :)

**Thank you and looking forward to the next steps! Email: rahulkejriwal18@gmail.com**
