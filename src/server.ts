import {App} from './app/app';
import { HealthCheckController } from './app/healthcheck/controllers/healthCheck.controller';
const app = new App([new HealthCheckController()]);

app.listen();