// Response builders for the lead-intake Worker.
//
// Every JSON response gets `Content-Type: application/json` and
// `Cache-Control: no-store`. CORS headers are added only when the caller's
// Origin was already determined to be on the allowlist (see index.ts) --
// a disallowed origin never receives Access-Control-Allow-Origin, on any
// status code, including errors.

export type CorsContext = {
  allowed: boolean;
  origin: string | null;
};

const BASE_JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function corsHeaders(cors: CorsContext): Record<string, string> {
  if (!cors.allowed || !cors.origin) return {};
  return {
    "Access-Control-Allow-Origin": cors.origin,
    Vary: "Origin",
  };
}

export function jsonResponse(
  status: number,
  body: unknown,
  cors: CorsContext,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...BASE_JSON_HEADERS,
      ...corsHeaders(cors),
      ...(extraHeaders ?? {}),
    },
  });
}

/**
 * OPTIONS /lead preflight response.
 *
 * Allowed origin -> 204 with the full CORS preflight header set.
 * Disallowed (or missing) origin -> 403 with no Access-Control-Allow-Origin,
 * so the browser's real request never proceeds.
 */
export function preflightResponse(cors: CorsContext): Response {
  if (!cors.allowed || !cors.origin) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": cors.origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}
