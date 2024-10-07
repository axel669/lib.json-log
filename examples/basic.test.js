import log, {
    createLogger,
    logLevel,
    basic,
    datadog,
    object,
} from "@axel669/json-log"

// log test with a timestamp
log.debug("test")
// default export is just an alias for this logger
// only logs message, basic logger doesnt use context
basic.logger.info("message", { value: true })

// logs an object with the message and other attributes
object.logger.warn(undefined)
// logs an object
object.logger.warn("", { value: true })

// create a logger with custom targets and log level
const multiLogger = createLogger(
    logLevel.info,
    {},
    object,
    datadog
)
// create a child logger that has additional default context
const child = multiLogger.child({ id: "child" })
// since the parent logger has a min log level of info, this will not be logged
child.debug("skip this")
// logs an error in both the object format and the datadog format
child.error("child log")
// log the error message as the main message and the error details in the
// context automatically
child.error(new Error("error obj"))
