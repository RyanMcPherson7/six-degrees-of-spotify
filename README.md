# Six Degrees of Spotify
A web app to find the shortest path between 2 popular Spotify artists using data collected from Spotify's "fans also listen to" feature and a breadth first search algorithm. You can view the live version [here](https://sixdos.herokuapp.com)

<div align="center">
  <img src="/client/public/external-site-image.png" alt="app main view" width="800" />
</div>

## :crystal_ball: How it Works
1. Six Degrees of Spotify consists of both a React [`/client`](/client) and a Node.js [`/server`](/server)
2. Users interact with the UI to send requests to the server to compute their requested artist path
3. Upon request, the server will generate an unweighted, bidirectional [graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) with ~11,000 vertices (artists) and ~112,000 edges (connections) from a [`flat-file`](/server/data/connections-50.txt)
4. The data inside the flat-file was generated on 7/25/22 with a [popularity](https://help.chartmetric.com/en/articles/1560578-what-is-spotify-popularity-index) minimum of 50 using code from [`/server/data-scrapping`](/server/data-scrapping) and the [`GET /v1/artists/{id}/related-artists`](https://developer.spotify.com/console/get-artist-related-artists/) endpoint from the [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
5. After building the graph, [breadth first search](https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/tutorial/) is run to find the shortest path (smallest degree) between the 2 input artists
6. Finally, the server sends the computed path to the client to be displayed

## :rocket: Running Locally
### Prereqs
1. Install Node.js [here](https://nodejs.org/en/)
2. Clone the repo with 
```
git clone https://github.com/RyanMcPherson7/six-degrees-of-spotify.git
```
### Setting up the client
1. Open a new terminal session inside `/six-degrees-of-spotify`
2. Access the client directory with `cd client`
3. Install dependencies with `npm ci`
4. Start the client with `npm run start`
### Setting up the server
1. Open a new terminal session inside `/six-degrees-of-spotify`
2. Access the server directory with `cd server`
3. Install dependnecies with `npm ci`
4. Start the server with `npm run start`
### Viewing the app
1. You should see the app running on [`localhost:3000`](http://localhost:3000)
2. :tada: Congrats! The app is up and running!

## :whale: Running Locally With Docker
### Prereqs
1. Install and run docker [here](https://docs.docker.com/get-docker/)
2. Clone the repo with 
```
git clone https://github.com/RyanMcPherson7/six-degrees-of-spotify.git
```
### Building and Running the App
1. Open a new terminal session inside `/six-degrees-of-spotify`
2. Build the image with `docker build . -t sixdos`
3. Start the container with `docker run -p 3000:5000 sixdos`
### Viewing the App
1. You should see the app running on [`localhost:3000`](http://localhost:3000)
2. :tada: Congrats! The app is up and running!
