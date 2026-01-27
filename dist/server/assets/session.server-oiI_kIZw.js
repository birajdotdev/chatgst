import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { c as createServerFn } from "../server.js";
const getSessionFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3d82bde82f26c89034216a22956c8746729c62e208bb72d3bdae08c5d406ef7c"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("e30d56bee5d09b16918aa78f8d5a871d9305251df85e233e52d32e06dce1f317"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("ba7b06fe48b1583455a04f827c1f1899ac9b667c5295b2a7ab4e4f8bb2b0de95"));
const deleteSessionFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("dafcf6a7374d783f34818d1e228e3c725608f417952133c82e677c305f3ebdb7"));
const verifySessionFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("715af993a56fb9ddf0148aadc6f24492f6de40edfcafb54f9841669a6020ee07"));
export {
  deleteSessionFn as d,
  getSessionFn as g,
  verifySessionFn as v
};
