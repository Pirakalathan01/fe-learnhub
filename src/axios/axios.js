import axios from "axios";
import env from "../config/env"

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL ="https://63gfn7h3naskfg4ivxuvpwqxde0mnmnc.lambda-url.ap-southeast-1.on.aws";