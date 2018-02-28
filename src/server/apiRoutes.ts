import * as express from "express";
import * as apiController from "./routeControllers";

const InvestorRouter = express.Router();

InvestorRouter.route("/investors")
                .post( apiController.createInvestor )

const OneSignalSDKUpdaterWorker = express.Router();

OneSignalSDKUpdaterWorker.route("/OneSignalSDKUpdaterWorker.js")
                .get( apiController.getServiceWorker );

const OneSignalSDKWorker = express.Router();
                
OneSignalSDKWorker.route("/OneSignalSDKWorker.js")
                .get( apiController.getServiceWorker );

const ManifestJsonRouter = express.Router();
                                
ManifestJsonRouter.route("/manifest.json")
                .get( apiController.getManifestJson );
            
const OneSignalIntegrationRouter = express.Router();
                
OneSignalIntegrationRouter.route("/onesignal-integration.js")
.get( apiController.getOneSignalIntegrationFile );

const CountryOfInvestorRouter = express.Router();
CountryOfInvestorRouter.route("/investors/latest")
                .get( apiController.getRecentInvestorsByCountry );

export const routeArr = [
    InvestorRouter, 
    OneSignalSDKUpdaterWorker, 
    OneSignalSDKWorker, 
    ManifestJsonRouter, 
    OneSignalIntegrationRouter,
    CountryOfInvestorRouter
];
