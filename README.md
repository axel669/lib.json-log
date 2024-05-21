# JSON Log
Easy to use logger that prints stuff in a json format for log ingestion.

## API

### Standard Logging
`debug(message, context?)`
`info(message, context?)`
`warn(message, context?)`
`error(message, context?)`
Logs a message to the console with additional, optional context. The context
in a call is merged with the context provided to the logger (for child loggers).
The top level logger uses an empty object for its base context. The functions
all use `console.log` to actually log messages, with each function determining
the `logLevel` property on a message.

### Child Loggers
`child(context)`
Creates a child logger that has the context provided merged with all context
objects provided in functions.

## Example
```js
import log from "@axel669/json-log"

// logs {"message":"test","logLevel":"info","context": {}}
log.debug("test")
// logs {"message":"message","logLevel":"info","context":{"value":true}}
log.debug("message", { value: true })

const child = log.child({ id: "child" })
// logs {"message":"child log","logLevel":"error","context":{"id":"child"}}
child.error("child log")
```
