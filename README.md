# Helicarrier Assessment

This Assessment displays a list of mock data using a
test graphql server with functionalities to search
through the data or use filters on it.

## Decisions Taken

- To be able to do a global search on the data in all the objects, I had to make use of a nested loop to check all key, values in each object, although I know this is not the best for performance optimization
- I also had to create a different structure of the data different from what I got from the graphql server, I made the decison to structure it according to the assessment on the frontend becase of it complicates the graphql schema.

### Steps to run the server app

- After cloning the project
- then `cd server`
- install dependencies `npm install`
- start the server `npm run dev`

### Steps to run the client app

- After cloning the project
- then `cd client`
- install dependencies `npm install`
- start the app `npm run dev`

`Note: Ensure the server is started before the client app`
