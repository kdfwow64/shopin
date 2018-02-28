import * as request from "request";
import {apiUrls} from "core/constants/content";
import * as manifestJson from 'client/manifest.json';

const backend_service_url = apiUrls.backendServiceUrl;
manifestJson["gcm_sender_id"] = process.env.SHOPIN_GCM_SENDER_ID || manifestJson["gcm_sender_id"];

const ONE_SIGNAL_APP_ID = process.env.SHOPIN_ONE_SIGNAL_APP_ID || "2f6b1077-78c4-478e-b9d7-668005b26ed6";

const OneSignalIntegrationFile = "var OneSignal = window.OneSignal || [];" +
                                   "OneSignal.push(function() {" +
                                        "OneSignal.init({" +
                                            "appId: \"" + ONE_SIGNAL_APP_ID + "\"," +
                                        "});" +
                                    "});";

const totalLen = process.env.SHOPIN_RECENT_INVESTORS_TOTAL_LEN || "" , 
    timeWindow = process.env.SHOPIN_RECENT_INVESTORS_TIME_WINDOW || "";

export function createInvestor(req, res){
    const investor_route = apiUrls.investors;

    console.log(backend_service_url + investor_route);
    request( {
        url: backend_service_url + investor_route,
        method: "POST",
        json: req.body,
        headers: req.headers
    }, (err, response, body) => {
        if(err){
          console.log("error at api");
          console.log(err);
          return res.status(400).send({"err":true})
        }
        console.log("Error - " + err);
        console.log("Body - " + body);
        return res.status(response.statusCode).send(body);
    });
}

export function getServiceWorker(req, res){
    let workerName = req.originalUrl.split("?")[0].split("/")[1];

    let options = {
        root: __dirname + '/static/assets/service-workers/'
    };

    return res.sendFile(workerName, options, (err) => {
        if (err){
            return console.log("error while sending service worker file for " + workerName + " => ", err);
        }
        console.log("sent the service worker file => ", workerName);
    });
}

export function getManifestJson(req, res){
    return res.json(manifestJson);
}

export function getOneSignalIntegrationFile(req, res){
    res.type("js").send(OneSignalIntegrationFile);
}

export function getRecentInvestorsByCountry (req, res){
    const _random_recent_investor_route = apiUrls.latestRandomInvestors;

    let headers_obj = {
        "Cache-Control": "no-cache, no-store, must-revalidate"
    };

    if (!timeWindow || !totalLen){
        return res.set(headers_obj).type('json').send({
            "lastestInvestors":[],
            "endQueryChain": true
        });
    }
    
        request( {
            url: backend_service_url + _random_recent_investor_route + "?timeWindow=" + timeWindow + "&totalLen=" + totalLen,
            method: "GET"
        }, (err, response, body) => {
            if(err){
              console.log("error at recent random investors api");
              console.log(err);
              return res.set(headers_obj).type('json').status(500).send({"err":true});
            }
            console.log("Error at recent random investors api  - " + err);
            console.log("Body at recent random investors api - " + body);

            return res.set(headers_obj).type('json').status(response.statusCode).send(body);
        });
}

