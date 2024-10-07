# JSON Log
Easy to use logger that prints stuff in a json format for log ingestion.

## Exports

### createLogger(minLevel, ctx, ...targets)
Creates a logger with any number of log targets and default context.

### logLevel
An object with numeric values for the various log levels. (I use this to
configure log level using env vars cause I'm lazy)
Levels:
- debug
    > Allow all logs
- info
    > Don't log debug messages
- warn
    > Don't log debug, info
- error
    > Only log error messages
- none
    > Turn off logging without removing every function call in the code

### basic
A log target that just logs the message as is, with a timestamp added to it.

### datadog
A log target that prints the log and its context as a JSON string on a single
line so that the default Datadog JSON parsing can be used to process the logs
without any kind of special config.

### object
A log target that shows the log message, timestamp, level, and context as an
object printed in the console.

### default export
The default export of the library is the built in basic logger. See the API
section for details.

## API
The API for logging is based on creating loggers, or using any of the built in
logger provided by the library. Each of the built in targets also has a default
logger on the `.logger` property that is configured to allow all logs with an
empty initial context and uses only that target (ex: `basic.logger`).

### Logger.debug(message, context)
Logs a message and the additional context at the DEBUG level

### Logger.info(message, context)
Logs a message and the additional context at the INFO level

### Logger.warn(message, context)
Logs a message and the additional context at the WARN level

### Logger.error(message, context)
Logs a message and the additional context at the ERROR level

### Logger.child and Child Loggers
The `Logger.child(extraCtx, newMinLevel?)` can be used to create child loggers.
A child logger inherits the context and log level of its parent unless a new min
log level is given, and merges the extraCtx with the parents context to create
its own. There is no limit to the depth of children.

```js
const parent = createLogger(logLevel.debug, { id: 1 }, object)
const child = parent.child({ isChild: true }, logLevel.info)

// logs with the context { id: 1 }
parent.debug("test")
// logs with the context { id: 1, isChild: true }
child.info("test")
// won't log anything
child.debug("test")
```

## Example
See the examples folder in the repo.
