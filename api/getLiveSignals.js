
export default async function handler(req, res) {
  const apiKey = "vNpTsWME6XAVD0edplwS3AlTk0X4";
  const symbol = "X:MNQUSD";
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const open = data.results[0].o;
    const close = data.results[0].c;
    const result = close > open ? "BUY" : "SELL";
    const confidence = Math.floor(Math.abs((close - open) / open) * 100) + 70;

    const signal = {
      result,
      confidence,
      reason: result === "BUY" ? "Bullish signal detected" : "Bearish pullback detected",
      timestamp: new Date().toISOString(),
      source: "TrendLens AI v1.0"
    };

    res.status(200).json([signal]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Polygon." });
  }
}
