/**
 * Runs in <head> before the page paints. Sets html[data-zone] to "C" (India, ₹)
 * or "A" (everywhere else, $) from ?region= or the browser time zone.
 * Keep the mapping in sync with visitor-zone.ts and mentorship-pricing.ts.
 */
export const ZONE_SCRIPT = `(function(){try{var m={a:"A",global:"A",us:"A",usa:"A",b:"A",international:"A",c:"C",india:"C","in":"C"};var p=new URLSearchParams(location.search).get("region");var z=p&&m[p.toLowerCase()];if(!z){var t=Intl.DateTimeFormat().resolvedOptions().timeZone;z=(t==="Asia/Kolkata"||t==="Asia/Calcutta")?"C":"A";}document.documentElement.setAttribute("data-zone",z);}catch(e){}})();`;
