import { GET, POST } from "@/auth";

export { GET, POST };
export const runtime = "edge";

// Enable debug mode
export const debug = process.env.NODE_ENV === "development";