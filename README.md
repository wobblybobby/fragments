# fragments

ccp555

Lint
In order to make sure that there are no errors to be fixed, run ESLint by typing "npm run lint"

Start
In order to start the server, type "npm start" to run the start script defined in package.json.
This runs "node src/server.js"

Dev
Alternatively, type "npm run dev" to run the dev script defined in package.json.
This runs "cross-env LOG_LEVEL=debug nodemon ./src/server.js --watch src"
Be mindful that this required the cross-env package on my current Windows OS.

Debug
Alternatively, type "npm run debug" to run the debug script defined in package.json
This runs "cross-env LOG_LEVEL=debug nodemon --inspect=0.0.0.0:9229 ./src/server.js --watch src"
Be mindful that this also requires the cross-env package on my current Windows OS.

Once the server is started, go to http://localhost:8080/ in browser, use "curl http://localhost:8080/", or use "curl -s http://localhost:8080/ | jq" to initiate the get request (presently just a health check defined in app.js).
