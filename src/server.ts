import { validateEnv } from "./core/utils";
import App from "./app";
import { InderRoutes } from "./modules/index";

validateEnv();

const routes = [ new InderRoutes() ]
const app = new App(routes);
app.listen();