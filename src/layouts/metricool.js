const metricoolId = import.meta.env.METRICOOL_ID;

function loadScript(callback) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://tracker.metricool.com/resources/be.js";
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
}
loadScript(function () {
  beTracker.t({ hash: metricoolId });
});
