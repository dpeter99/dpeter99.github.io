
import {config, archivist} from "./archivist.config.ts";

config.outputURL = "http://127.0.0.1:8888";

archivist.run(config);
