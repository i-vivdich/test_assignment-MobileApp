import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// routes include
import passRoute from './routes/pass.routes';
import authRoute from './routes/auth.routes';

// DB include
import db from './models';
import { dbConfig } from './config/db.config';

// Express setup
const app = express();

const corsOptions: { [key: string]: string } = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

// initializing DB
const Role = db.role;

db.mongoose.connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.URL}/${dbConfig.DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB');
        initial();
    })
    .catch((err: any) => {
        console.error("Connection error", err);
        process.exit();
    });



app.get('/', (req, res) => {
    res.json({ message: 'Main route is functioning. The rest is perhaps too :)'});
});

// routes
app.use('/api/auth', authRoute);
app.use('/password', passRoute);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});

function initial() {
    Role.estimatedDocumentCount((err: any, count: any) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err: any) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'user' to the roles collection");
            });

            new Role({
                name: "admin",
            }).save((err: any) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'admin' to the roles collection");
            });
        }
    });
}