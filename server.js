const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');
const serverMongo = http.createServer(app);

const normalizePort = val => {
  var portM = parseInt(val, 10);
  if (isNaN(portM)) {
      return val;
  }
  if (portM >= 0) {
      return portM;
  }
  return false;
}
const port = normalizePort(process.env.NODE_ENV || 3000);
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    // @ts-ignore
    const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privilages");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = () => {
    const addr = serverMongo.address();
    const bind = typeof addr === "string" ? "pipe " + addr: "port " + port;
    debug("Listning on " + bind);
};
app.set('port', port);
serverMongo.on("error", onError);
serverMongo.on("listening", onListening);
serverMongo.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

