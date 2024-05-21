import log from "../main.js"

log.debug("test")
log.debug("message", { value: true })

const child = log.child({ id: "child" })
child.error("child log")
