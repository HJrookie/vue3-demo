export let api = {
  "baseUrl": "http://10.103.237.165:8080",
};
if (import.meta.env.NODE_ENV === "production") {
  // if (process.env.NODE_ENV === 'development') {
  const Http = new XMLHttpRequest();
  Http.open("GET", "/config.json", false);
  Http.send(null);
  if (Http.readyState === 4) {
    const res = JSON.parse(Http.responseText);
    api.baseUrl = res.baseUrl;
  }
}
