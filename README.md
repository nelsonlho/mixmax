# Movie Poster for Mixmax

This is an open source based on Mixmax Link Resolver.

See <http://sdk.mixmax.com/docs/tutorial-giphy-link-preview> for more information about how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=http://www.omdbapi.com/?t=the+great+gatsby
```
