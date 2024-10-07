export const logLevel = {
    debug: 0,
    info: 10,
    warn: 20,
    error: 30,
    none: Number.POSITIVE_INFINITY,
}
/**
@typedef {{ [key: string]: any }} Context
@typedef {{
    message: any
    level: number
    timestamp: number
    context: Context
}} LogInfo
@typedef {(msg: any, msgCtx: Context) => void} LogFunction
@typedef {{
    debug: LogFunction
    info: LogFunction
    warn: LogFunction
    error: LogFunction
    child: (extraCtx: Context, newMinLevel: number?) => Logger
    get minLevel: number
}} Logger
@typedef {{
    (info: LogInfo, raw: any) => void
    logger: Logger?
}} Target
*/

/**
@param {number} minLevel
@param {Context} ctx
@param {Target[]} targets
@return {Logger}
*/
export const createLogger = (minLevel = logLevel.debug, ctx = {}, ...targets) => {
    /**
    @param {any} message
    @param {string} level
    @param {Context} context
    @param {any} raw
    @return {void}
    */
    const write = (message, level, context, raw) => {
        if (minLevel > logLevel[level]) {
            return
        }
        for (const target of targets) {
            target(
                {
                    message,
                    level,
                    timestamp: Date.now(),
                    context,
                },
                raw
            )
        }
    }

    return {
        debug: (msg, msgCtx) => write(msg, "debug", { ...ctx, ...msgCtx }, msg),
        info: (msg, msgCtx) => write(msg, "info", { ...ctx, ...msgCtx }, msg),
        warn: (msg, msgCtx) => write(msg, "warn", { ...ctx, ...msgCtx }, msg),
        error: (msg, msgCtx) => {
            if (msg instanceof Error) {
                write(
                    msg.message,
                    "error",
                    {
                        errorType: msg.name,
                        stack: msg.stack,
                        ...ctx,
                        ...msgCtx
                    },
                    msg
                )
                return
            }
            write(msg, "error", { ...ctx, ...msgCtx }, msg)
        },
        child: (extraCtx, newMinLevel = minLevel) => createLogger(
            newMinLevel,
            { ...ctx, ...extraCtx },
            ...targets
        ),
        get minLevel() { return minLevel },
    }
}
