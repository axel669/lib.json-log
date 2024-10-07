export { basic } from "./targets/basic.js"
export { datadog } from "./targets/datadog.js"
export { object } from "./targets/object.js"
export { createLogger, logLevel } from "./create-logger.js"

import { basic } from "./targets/basic.js"
export default basic.logger
