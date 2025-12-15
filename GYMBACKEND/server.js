const

express = require('express'),
cors = require('cors'),
connectDb = require("./config/db"),
colors = require("colors"),
dotenv = require("dotenv"),
bodyParser = require('body-parser'),
router = require("./routes/index"),
path = require('path'),
/***
Morgan is a popular HTTP request logger middleware for Node.js applications, particularly those built with the Express.js framework. It simplifies the process of logging details about incoming HTTP requests and their corresponding responses.
 */
morgan = require('morgan'),
mongoose = require ('mongoose'),

// method-override is middleware that interprets requests according to a specific query
  // parameter and HTTP method. With the _method=PUT query parameter, you can interpret
  // POST requests as PUT requests
methodOverride = require("method-override"),


bodyparser = require("body-parser");

const app = express();

//config
dotenv.config();

//connect to database
connectDb();

app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin:'http://localhost:3000'}));
app.use(express.json());
app.use(morgan('dev'));
/* Express Static Files */
app.use("/public/images", express.static((path.join(__dirname,"public/images"))));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false,}),)

// set uyp the aplication to listen on port 4000
app.set("port", process.env.PORT || 4000);

// Tell the application to use methodOverride as middleware
// method-override is middleware that interprets requests according to a specific query
// parameter and HTTP method. With the _method=PUT query parameter, you can interpret
// POST requests as PUT requests

app.get('/', (req, res) => {
  res.send('Hi')
})

app.use(methodOverride("_method", { methods: ["POST", "GET"]}));

// This code tells your Express.js application to use the router object as
// a system for middleware and routing.

app.use("/", router);


  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}         `.bgCyan.blue);
  });