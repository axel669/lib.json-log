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
export const basic = (log, raw) => {
    const time = formatter.format(log.timestamp)
    console[levels[log.level] ?? log.level](`[${time}]`, raw)
}
basic.logger = createLogger(logLevel.debug, {}, basic)
