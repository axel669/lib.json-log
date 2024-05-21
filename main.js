const logger = (basectx = {}) => {
    const write = (message, context, logLevel) => console.log(
        JSON.stringify({ context, message, logLevel })
    )

    return {
        debug: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "debug"),
        info: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "info"),
        warn: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "warn"),
        error: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "error"),
        child: (extraCtx) => logger({ ...basectx, ...extraCtx }),
    }
}

export default logger({})
