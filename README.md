# Fauna Orders

Fauna Orders is a simple application created to connect to a Fauna Database and show its content.  Its architecture contains two mains parts: 
A web service to provide Orders information;
A frontend app that connects to the web service and shows its data. 
Both parts were made using Next.js. It was a straightforward decision since I was planning to use Zeit as a hosting provider, and I believe Next is the natural framework option for it. Next.Js provides an excellent solution not only to build static react applications but also to create/maintain Serverless functions deployed on Zeit. 

## Web Service
Written in Node and Typescript, the Orders endpoint is a serverless function that uses GraphQL to connect to FaunaDB. FQL was a great option, although since I had a time constraint, I tried to go with a more familiar protocol for connecting to the database. 

I am using a cache-control directive, which applies edge caching on subsequent (in a 30s timeframe) requests to the endpoint. It does not only speed up client requests but also prevents too much resource utilization on the serverless function.

I am getting an average time of ~300ms on requests (non-cached) pointing to the endpoint, so I am satisfied with the performance too. 

## Frontend App
The FrontEnd app was implemented using the following technologies:
React
Zeit-SWR
Axios
Bulma CSS framework

Desktop:

Mobile:

### UI

I tried to implement a simple UI but attending to basic design principles and also providing a pleasant experience to users. I also used Fauna's primary dashboard color and developed a more completed color palette from it. 

Palette:

### Javascript

The application is composed of several React components (also written with typescript/jsx). Most of them are only presentational, only depending on props to render its content. Since it is a relatively simple application, I did not use a more complex state framework or library. Probably in future features, where we could add more features (like paginating, filters, etc.), it would be recommended to start using something to handle multiple states and side-effects (like redux, relay, etc.). 

I intend to follow the best practices for using a JAM stack. The app is rendered only once (at deploy time), and all the markup is statically served on every request. The request to the Orders endpoint is made on the client-side, and the final page is mounted after that. 

Zeit-SWR was also used to provide a quick client cache control, but also for the request management and error/loading controls. 

## CI
[](https://github.com/rodrigomaia17/fauna-orders/workflows/Node%20CI/badge.svg)
I am experimenting with Github Actions to run tests after every push to master. A possible next improvement would be having it deploying to Zeit after a successful run. 

## Hosting

The full solution is being deployed to Zeit using Now since the first commit. 
Endpoint: https://fauna-orders.rodrigomaia.me/api/orders
Web app: https://fauna-orders.rodrigomaia.me

## Testing
The tests for this application follow unit and e2e strategies. 

### Unit
The react components have mostly presentational behavior, so I am testing how props change the rendered DOM, using proper DOM-based assertions (using Jest) and also snapshot testing.
The Serverless function also has test coverage for all the data transformations it does between the Graphql response and the JSON returned for its consumers. 

### E2E
I've used Cypress to test a full scenario of opening the home page, seeing the orders being loaded, and clicking of one of them and seeing its details. 
