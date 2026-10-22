// This segment sets its own `openGraph`, which replaces the root's resolved
// object and drops the root image. Re-export it so og:image survives.
export { default, alt, size, contentType } from "../opengraph-image";
