const logger = (basectx = {}) => {
    const write = (message, context, logLevel) => console[logLevel](
        JSON.stringify({ context, message })
    )

    return {
        debug: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "debug"),
        info: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "log"),
        warn: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "warn"),
        error: (msg, ctx) => write(msg, { ...basectx, ...ctx }, "error"),
        child: (extraCtx) => logger({ ...basectx, ...extraCtx }),
    }
}

export default logger({})
