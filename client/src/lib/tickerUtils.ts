export interface TickerStock {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
}

export type TickerSpeed = 'slow' | 'normal' | 'fast';

export const TICKER_SPEEDS: Record<TickerSpeed, { duration: number; label: string }> = {
  slow: { duration: 180, label: 'Slow' },
  normal: { duration: 120, label: 'Normal' },
  fast: { duration: 60, label: 'Fast' },
};

export const STORAGE_KEY_SPEED = 'rotech-ticker-speed';

export function getStoredSpeed(): TickerSpeed {
  if (typeof window === 'undefined') return 'normal';
  const stored = localStorage.getItem(STORAGE_KEY_SPEED);
  if (stored && ['slow', 'normal', 'fast'].includes(stored)) {
    return stored as TickerSpeed;
  }
  return 'normal';
}

export function setStoredSpeed(speed: TickerSpeed): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SPEED, speed);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatChange(change: number): string {
  const prefix = change >= 0 ? '+' : '';
  return `${prefix}${change.toFixed(2)}`;
}

export function formatChangePercent(changePercent: number): string {
  const prefix = changePercent >= 0 ? '+' : '';
  return `${prefix}${changePercent.toFixed(2)}%`;
}

export function filterStocks(stocks: TickerStock[], query: string): TickerStock[] {
  if (!query.trim()) return stocks;
  const lowerQuery = query.toLowerCase().trim();
  return stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(lowerQuery) ||
      stock.symbol.toLowerCase().includes(lowerQuery)
  );
}

export const defaultStockData: TickerStock[] = [
  { name: "NIFTY 50", symbol: "NSEI", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
  { name: "BANK NIFTY", symbol: "NSEBANK", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
  { name: "SENSEX", symbol: "BSESN", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
  { name: "Reliance", symbol: "RELIANCE", price: 2456.75, change: 32.50, changePercent: 1.34, open: 2424.25, high: 2468.00, low: 2418.00, prevClose: 2424.25 },
  { name: "TCS", symbol: "TCS", price: 4125.30, change: -28.45, changePercent: -0.69, open: 4153.75, high: 4162.00, low: 4115.00, prevClose: 4153.75 },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: 1725.60, change: 15.20, changePercent: 0.89, open: 1710.40, high: 1732.00, low: 1708.00, prevClose: 1710.40 },
  { name: "ICICI Bank", symbol: "ICICIBANK", price: 1285.40, change: 18.75, changePercent: 1.48, open: 1266.65, high: 1292.00, low: 1262.00, prevClose: 1266.65 },
  { name: "Infosys", symbol: "INFY", price: 1875.25, change: -12.30, changePercent: -0.65, open: 1887.55, high: 1895.00, low: 1868.00, prevClose: 1887.55 },
  { name: "ITC", symbol: "ITC", price: 485.60, change: 5.85, changePercent: 1.22, open: 479.75, high: 488.00, low: 478.00, prevClose: 479.75 },
  { name: "SBI", symbol: "SBIN", price: 812.45, change: -8.20, changePercent: -1.00, open: 820.65, high: 825.00, low: 808.00, prevClose: 820.65 },
  { name: "Bharti Airtel", symbol: "BHARTIARTL", price: 1658.90, change: 22.45, changePercent: 1.37, open: 1636.45, high: 1665.00, low: 1632.00, prevClose: 1636.45 },
  { name: "Kotak Bank", symbol: "KOTAKBANK", price: 1795.30, change: -15.60, changePercent: -0.86, open: 1810.90, high: 1818.00, low: 1788.00, prevClose: 1810.90 },
  { name: "L&T", symbol: "LT", price: 3685.75, change: 42.30, changePercent: 1.16, open: 3643.45, high: 3698.00, low: 3635.00, prevClose: 3643.45 },
  { name: "HUL", symbol: "HINDUNILVR", price: 2485.60, change: -18.90, changePercent: -0.75, open: 2504.50, high: 2512.00, low: 2478.00, prevClose: 2504.50 },
  { name: "Axis Bank", symbol: "AXISBANK", price: 1178.25, change: 14.55, changePercent: 1.25, open: 1163.70, high: 1185.00, low: 1160.00, prevClose: 1163.70 },
  { name: "Wipro", symbol: "WIPRO", price: 505.80, change: 3.25, changePercent: 0.65, open: 502.55, high: 508.00, low: 500.00, prevClose: 502.55 },
  { name: "Maruti", symbol: "MARUTI", price: 12045.50, change: -125.80, changePercent: -1.03, open: 12171.30, high: 12200.00, low: 12010.00, prevClose: 12171.30 },
  { name: "Tata Motors", symbol: "TATAMOTORS", price: 812.35, change: 9.45, changePercent: 1.18, open: 802.90, high: 818.00, low: 798.00, prevClose: 802.90 },
];
