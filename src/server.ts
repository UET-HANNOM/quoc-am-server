import App from "./app";
import { InderRoutes } from "./modules/index";

const routes = [ new InderRoutes() ]
const app = new App(routes);
app.listen();