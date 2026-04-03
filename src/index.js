import {app} from "./logic/app.js";
import { todoUi } from "./UI/todoUI.js";
const cont = new app();
import { projectUi } from "./UI/projectUI.js";
const render = new projectUi(cont);
const rendertodo = new todoUi(cont);
