import express, { Request, Response } from 'express';
import { Config } from './shared/config';

class App{
    public app: express.Application;

    constructor(controllers: any[]){
        this.app = express();
        this.initializeMiddlewares();
        this.initControllers(controllers);
        Config.getAllParameters(`/${process.env.NODE_ENV}/`);
    }

    public listen() {
        this.app.listen(process.env.PORT || 3600, () => {
          console.log(`App listening on the port ${process.env.PORT || 3600}`); 
        });
      }
    /*
    * This method initializes the controllers
    * @param controllers: any[]
    * @returns void
    */
    public initControllers(controllers: any[]) {
        controllers.forEach((controller: any) => {
          this.app.use('/', controller.router);
        });
      }  
      private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(function (req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
          if (req.method === 'OPTIONS') {
            return res.send(200);
          } else {
            return next();
          }
        });
      
    }
}




export { App };