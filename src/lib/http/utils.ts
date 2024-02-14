export function authHeader(token: string) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

export function formatAPIPath(path: string) {
  if (import.meta.env.DEV) {
    return `/api${path.charAt(0) === "/" ? path : `/${path}`}`;
  } else {
    return `${import.meta.env.VITE_BACKEND_URL}${path.charAt(0) === "/" ? path : `/${path}`}`;
  }
}
