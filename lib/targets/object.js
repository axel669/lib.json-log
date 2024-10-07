import { createLogger, logLevel } from "../create-logger.js"
/** @import { Target } from "../create-logger.js" */

const levels = {
    "info": "log"
}

const locale = Intl.DateTimeFormat().resolvedOptions().locale
const formatter = Intl.DateTimeFormat(
    locale,
    {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        hourCycle: "h24"
    }
)

/** @type {Target} */
export const object = (log) => {
    const time = formatter.format(log.timestamp)
    console[levels[log.level] ?? log.level](`[${time}] ${log.level}`, log)
}
object.logger = createLogger(logLevel.debug, {}, object)
