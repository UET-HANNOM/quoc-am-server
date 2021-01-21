import { validateEnv } from "@core/utils";
import { InderRoutes } from "@modules/index";
import UsersRoutes from "@modules/users/routes";
import App from "./app";

validateEnv();

const routes = [ new InderRoutes() , new UsersRoutes()]
const app = new App(routes);
app.listen();