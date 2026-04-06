import express from 'express';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// Important variables for the server.
const app = express();
const portNumber = process.env.PORT || 3000;
const directoryName = import.meta.dirname;
const frontEndDirectoryName = path.join(directoryName, '..', 'frontend');
const publicDirectoryName = path.join(frontEndDirectoryName, 'public');

// Variables for zoo status and visitor count.
let zooStatus = "Open";
let visitorCount = 60;

// Gets the animal data from the JSON file.
let animalServerList = [];
const animalDataPath = path.join(directoryName, 'data/animalData.json');
const rawData = fs.readFileSync(animalDataPath);
animalServerList = JSON.parse(rawData);
console.log(animalServerList);

// Establishing a rate limit for the main web page.
const pagelimiter = rateLimit({ 
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

app.use(cors());

// Serves static files from the public directory.
app.use(express.static(path.join(publicDirectoryName)));
app.use(express.static(path.join(frontEndDirectoryName)));

// Parses incoming JSON data
app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Parses incoming URL-encoded data
app.use(express.text());

// The default route for the server.
app.get('/', pagelimiter, (req, res) => {
    try {
        console.log('Default route accessed');
        // res.sendFile(frontEndDirectoryName + '/FrontEnd/public/pages/index.html');
        // res.sendFile(path.join(frontEndDirectoryName, 'public', 'pages', 'index.html'));
        res.send("NTC Zoo API");
    } catch (e) {
        console.error("Error in accessing default route: ", e);
    }
});

// The route for fetching the zoo status.
app.get('/zooStatus', (req, res) => {
    try {
        res.send(zooStatus);
    } catch (e) {
        console.error("Error in fetching zoo status: ", e);
        res.status(500).send('Error occured in fetching zoo status');
    }
});

// The route for changing the zoo status.
app.put('/zooStatus/change', (req, res) => {
    try {
        zooStatus = req.body.newStatus;
        console.log(`The new zoo status: ${zooStatus}`);
        res.send(zooStatus);
    } catch (e) {
        console.error("Error in changing zoo status: ", e);
        res.status(500).send('Error occured in changing zoo status');
    }
});

// The route for fetching the visitor count.
app.get('/visitorCount', (req, res) => {
    try {
        res.send(visitorCount);
    } catch (e) {
        console.error("Error in fetching visitor count: ", e);
        res.status(500).send('Error occured in fetching visitor count');
    }
});

// The route for changing the visitor count.
app.put('/visitorCount/change', (req, res) => {
    try {
        console.log("Before: " + visitorCount);
        // if (req.body == "Minus")
        // {
        //     visitorCount--;
        // }
        // else if (req.body == "Plus")
        // {
        //     visitorCount++;
        // }
        // else
        // {
        //     visitorCount = 0;
        // }

        visitorCount = req.body.newCount;
        console.log("After: " + req.body.newCount);
        res.send(visitorCount);
    } catch (e) {
        console.error("Error in changing visitor count: ", e);
        res.status(500).send('Error occured in changing visitor count');
    }
});

// The route for fetching the animal data.
app.get('/animalData', (req, res) => {
    try {
        res.json(animalServerList);
    } catch (e) {
        console.error("Error in fetching animal data: ", e);
        res.status(500).send('Error occured in fetching animal data');
    }
});

app.post('/animalData/add', (req, res) => {
    try {
        let newAnimal = req.body;
        // let parsedAnimal = JSON.parse(newAnimal);
        // console.log(newAnimal);
        animalServerList.push(newAnimal);
        console.log(animalServerList);
        res.json({message: `A new animal has been added to the Zoo!`});
    } catch (e) {
        console.error("Error in adding new animal: ", e);
        res.status(500).send("Error occured in fetching new animal")
    }
});

// The route for changing status of an animal.
app.put('/animalData/:id/status', (req, res) => {
    try {
        let animalId = req.params.id;
        let status = req.body.status;

        let animal = animalServerList[animalId - 1];
        if (!animal)
        {
            console.log("Animal does not exist");
        }

        animal.status = status;

        console.log(animal);

        res.json({message: `The animal with the id of ${animalId} is now ${animal.status}`});
    } catch (e) {
        console.error("Error in changing animal status: ", e);
        res.status(500).send('Error occured in changing animal status');
    }
});

// Middleware to handle undefined routes
app.use((req, res, next) => {
    res.status(404).send('404 Error: Page not found');
});

// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Error: Internal Server Error');
});

// Creates the server.
app.listen(portNumber, () => {
  console.log(`Zoo server is running on port ${portNumber}`);
});