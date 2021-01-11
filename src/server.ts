import { validateEnv } from "@core/utils";
import { InderRoutes } from "@modules/index";
import App from "./app";

validateEnv();

const routes = [ new InderRoutes() ]
const app = new App(routes);
app.listen();