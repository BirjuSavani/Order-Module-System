import { config } from "dotenv";
import sequelize from "./utils/dbConfig/db.Config.js";
import { resolve, dirname } from 'path';

// Load env file
config({
    path: resolve(dirname(
        import.meta.url), '../.env')
});

// Load App
// import app from './app';
import apps from './app.js'

const PORT = process.env.PORT || 3030;

(async() => {
    try {
        await sequelize.authenticate();

        console.log('DB Connection has been established successfully');

        apps.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    } catch (error) {
        console.log('Unable to connect to the server \n', error);

        process.exit(1);
    }
})();