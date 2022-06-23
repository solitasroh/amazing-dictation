import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
});

export const QUERY_GAMES =  gql`
    query {
        games {
            id
        }
    }
`
