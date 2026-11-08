const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
    getHistoryDisplayState,
    getAIServiceFallbackMessage
} = require("../js/script.js");

describe("Dashboard network-history empty states", () => {
    it("shows the empty state when no records exist", () => {
        assert.equal(getHistoryDisplayState([]), "empty");
    });

    it("shows the chart state when records exist", () => {
        assert.equal(
            getHistoryDisplayState([{ timestamp: "2026-11-08T10:00:00Z" }]),
            "data"
        );
    });

    it("shows the error state when history cannot be loaded", () => {
        assert.equal(getHistoryDisplayState([], true), "error");
    });

    it("does not treat an empty history response as an API error", () => {
        assert.equal(getHistoryDisplayState([]), "empty");
    });
});

describe("AI service fallback messages", () => {
    it("explains missing AI dependencies for HTTP 503", () => {
        assert.match(
            getAIServiceFallbackMessage(503),
            /dependencies or model files are unavailable/i
        );
    });

    it("explains other AI service failures without breaking local analysis", () => {
        assert.match(
            getAIServiceFallbackMessage(500),
            /temporarily unavailable/i
        );
        assert.match(
            getAIServiceFallbackMessage(500),
            /local trend analysis remains available/i
        );
    });
});
