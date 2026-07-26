type LogLevel = 'log' | 'error' | 'warn' | 'debug';

function write(level: LogLevel, message: string, meta?: unknown): void {
  const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
  if (meta !== undefined) {
    console[level](prefix, message, meta);
    return;
  }
  console[level](prefix, message);
}

export const logger = {
  log: (message: string, meta?: unknown) => write('log', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  debug: (message: string, meta?: unknown) => write('debug', message, meta),
};
