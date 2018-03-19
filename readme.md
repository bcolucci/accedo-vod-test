
# Video On Demand

## Architecture overview

The application is composed by:
- A NoSQL database (Mongodb 3.6)
- A Redis server (little mongoose cache)
- The client: A React.js UI (served by light-server) 
- The API: A Node.js REST API

**Unfortunatly, it seems the Redis Mongoose cache lib does not work...**

---

- Each part is containerized with Docker, and all is orchestrated via Docker Compose.
- Configurations are managed via environment variables and injected by Docker Compose.
- Depending on the environement, the scripts called by the Dockerfile on each projects (API & client) do things differently.
- Both of the API and the client use Webpack (with different targets) and ES7+.
- The API runs on :3000, the UI on :3001

## Specifications

I nearly succeeded to finish all what was asked in the specifications: https://github.com/bcolucci/accedo-vod-test/blob/master/specifications.md

Most of the requirements have been satisfied.

## Caution

First of all, I'm a backend guy. I've some frontend knowledge but still, I'm a backend guy. And this tests was a lot frontend oriented :)

I'm very good at processing big data strams in real time, less in debugging a carousel. So please be indulgent!

**I miss a lot of time because of other tests, work and family... But I'm completly ready to pass a live coding test session if you want to!**

## Regrets

I had a lot of troubles with the carousel library, and discover after more than 7 months without coding any web application that all versions I used before were already old...

Because I miss time, I didn't use Redux for the routing and/or for application actions.

I've saw cool libraries like **reactstrap** or **jtest** but, again, the time...

Also, because I've decided to completly separate the API and the client, I had to deal with CORS. And because I miss time, I've just decided to use a simple session model. I would like to use standard libraries instead, of course...

I also miss time to implement frontend unit tests. **But the frontend testing environment is working!**

I don't achieve all backend tests, because I miss time, yep... I've covered maybe something like 80/90% of the API endpoints.

Finally, I didn't use SASS or LESS but I could. It's easy to add the good Webpack loaders... But again, I'm not a good designer, so what would be the goal to try to make awesome styles :)

## How to test

**Caution: You need to click first on the page before to be able to use the arrow navigation... Sorry for that, I don't have the trick to enable it directly when the page is loaded.**

### The demo project

The project is currently running on a AWS EC2 instance. Please check here: http://34.245.212.83:3001

## Run it in local

- Install Docker and Docker Compose.
- Clone the project:

```bash
git clone https://github.com/bcolucci/vod-test.git
```

- Let's build the docker images (dev mode):

```bash
export NODE_ENV=development
sh cmd.sh build
```

Let's run for the first time:

```bash
sh cmd.sh up
# you will have a client ECONNREFUSED error, do not panic :)
```

- Let's build the API and the client:

```bash
# can take a few seconds
sh cmd.sh exec api npm run build
sh cmd.sh exec client npm run build
```

- We have to fixturize:

```bash
# let's run the migration script
sh cmd.sh exec api sh migrate.sh up
```

- Go to http://localhost:3001

- Run the API tests

```bash
sh cmd.sh exec api npm test
sh cmd.sh exec client npm test
```

You should see something like (for the API):

```bash
[...]
<-- POST /sessions
--> POST /sessions 200 48ms 171b
<-- GET /sessions/5aaee662400b88002faa6c0a
--> GET /sessions/5aaee662400b88002faa6c0a 200 13ms 171b
<-- POST /sessions
--> POST /sessions 200 3ms 171b
<-- GET /sessions/5aaee662400b88002faa6c0b/views
--> GET /sessions/5aaee662400b88002faa6c0b/views 200 3ms 2b
<-- GET /movie_genres
--> GET /movie_genres 200 674ms 253b
<-- GET /movies?genre=Drama&count=true
--> GET /movies?genre=Drama&count=true 200 4ms 18b
<-- GET /movies?genre=Action&filter=title
--> GET /movies?genre=Action&filter=title 200 9ms 413b
<-- GET /movies?genre=Horror&filter=title&limit=3
--> GET /movies?genre=Horror&filter=title&limit=3 200 3ms 103b
[ 'Alien', 'Alien: Covenant', 'Aliens' ]
<-- GET /movies?genre=Horror&filter=title&skip=2&limit=5
--> GET /movies?genre=Horror&filter=title&skip=2&limit=5 200 5ms 184b
6   -_-_-_-_,------,
0   -_-_-_-_|   /\_/\ 
0   -_-_-_-^|__( ^ .^) 
  -_-_-_-  ""  "" 

6 passing (870ms)
```
