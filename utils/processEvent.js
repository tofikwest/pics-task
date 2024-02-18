const destinationsConfig = require("../destination.config.json");

function resolveAllStrategy(possibleDestinations, config) {
  const res = new Map();

  possibleDestinations.forEach((dest) => {
    Object.keys(dest).forEach((item) => {
      if (dest[item]) {
        const destinationExists = config.destinations.find(
          ({ name }) => item === name
        );

        res.set(item, destinationExists && res.has(item) ? true : false);
      } else {
        res.set(item, false);
      }
    });
  });

  return Object.fromEntries(res);
}

function resolveAnyStrategy(possibleDestinations, config) {
  const res = new Map();

  possibleDestinations.forEach((dest) => {
    Object.keys(dest).forEach((item) => {
      if (
        config.destinations.find(({ name }) => item === name) &&
        possibleDestinations.some((el) => el[item])
      ) {
        res.set(item, true);
      } else {
        res.set(item, false);
      }
    });
  });

  return Object.fromEntries(res);
}

function resolveCustomUserStrategy(
  possibleDestinations,
  customFunction,
  config
) {
  const res = new Map();

  const ansOfFunc = eval(customFunction);

  possibleDestinations.forEach((dest) => {
    Object.keys(dest).forEach((item) => {
      if (ansOfFunc && config.destinations.find(({ name }) => item === name)) {
        res.set(item, true);
      } else {
        res.set(item, false);
      }
    });
  });

  return Object.fromEntries(res);
}

function processEvent(eventBody, testConfig = null) {
  try {
    const { payload, possibleDestinations } = eventBody;
    const targetStrategy =
      eventBody.strategy || testConfig?.strategy || destinationsConfig.strategy;

    let validateByStrategy;

    switch (targetStrategy) {
      case "ALL":
        validateByStrategy = resolveAllStrategy(
          possibleDestinations,
          testConfig || destinationsConfig
        );
        break;
      case "ANY":
        validateByStrategy = resolveAnyStrategy(
          possibleDestinations,
          testConfig || destinationsConfig
        );
        break;

      default:
        validateByStrategy = resolveCustomUserStrategy(
          possibleDestinations,
          targetStrategy,
          testConfig || destinationsConfig
        );
        break;
    }

    for (const destination in validateByStrategy) {
      if (destination === true) {
        console.log(`Отправка события в ${destination}`);

        const wichConfig = testConfig ? testConfig : destinationsConfig;

        const bindTransport = wichConfig.destinations.find(
          (item) => item.name === destination
        );

        const options = {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

        switch (bindTransport) {
          case "http.post":
            options.method = "POST";
            if (destination.url) {
              fetch(destination.url, options);
            } else {
              console.log(`UnknownUrlError for ${destination}`);
            }
            break;
          case "http.put":
            options.method = "PUT";
            if (destination.url) {
              fetch(destination.url, options);
            } else {
              console.log(`UnknownUrlError for ${destination}`);
            }
            break;
          case "http.get":
            options.method = "GET";
            delete options.body;
            if (destination.url) {
              fetch(destination.url, options);
            } else {
              console.log(`UnknownUrlError for ${destination}`);
            }
            break;
          case "console.log":
            console.log(payload);
            break;
          case "console.warn":
            console.warn(payload);
            break;
          default:
            console.log(`UnknownDestinationError: ${destination}`);
        }
      }
    }

    return validateByStrategy;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = processEvent;
