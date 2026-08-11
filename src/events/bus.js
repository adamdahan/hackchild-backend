const handlers = [];

/** Handlers declare which events they want by predicate, not by name. */
export function register(handler) {
  handlers.push(handler);
}

export function publish(event) {
  const match = handlers.find((h) => h.canHandle(event));
  if (!match) return; // silently dropped — see docs/platform/event-bus.md
  queueMicrotask(() => {
    match.handle(event).catch((err) => console.error('[bus] handler failed', err));
  });
}
