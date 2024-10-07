import { createLogger, logLevel } from "../create-logger.js"
/** @import { Target } from "../create-logger.js" */

const levels = {
    "info": "log"
}

/** @type {Target} */
export const datadog = (log) => {
    console[levels[log.level] ?? log.level](
        JSON.stringify(log)
    )
}
datadog.logger = createLogger(logLevel.debug, {}, datadog)
