const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const script = fs.readFileSync("js/script.js", "utf8");

test("dashboard has one network chart and distinct empty/error states", () => {
  assert.equal((html.match(/id=["']networkChart["']/g) || []).length, 1);
  assert.match(html, /id=["']historyEmptyState["']/);
  assert.match(html, /id=["']historyErrorState["']/);
});

test("history loader distinguishes empty results from API failures", () => {
  assert.match(script, /setNetworkHistoryState\(history\.length > 0 \? "populated" : "empty"\)/);
  assert.match(script, /setNetworkHistoryState\("error"\)/);
  assert.match(script, /if \(emptyState\) emptyState\.hidden = state !== "empty"/);
  assert.match(script, /if \(errorState\) errorState\.hidden = state !== "error"/);
});
