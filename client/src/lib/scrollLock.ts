/**
 * Utility to clear any stuck scroll locks left by Radix UI components
 * (Sheet, Dialog, Dropdown, etc.) or navigation changes.
 * 
 * Important: We only reset styles, we do NOT remove Radix portal containers
 * as they are reused by Radix for subsequent modals/sheets.
 */
export function clearScrollLock(): void {
  // Reset body styles that scroll-lock libraries typically set
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.height = '';
  
  // Reset html/documentElement styles
  document.documentElement.style.overflow = '';
  document.documentElement.style.paddingRight = '';
  
  // Remove Radix-specific scroll lock attribute
  document.body.removeAttribute('data-scroll-locked');
  document.documentElement.removeAttribute('data-scroll-locked');
  
  // Note: We intentionally do NOT remove [data-radix-portal] nodes
  // as Radix reuses them for subsequent modals/sheets
}
