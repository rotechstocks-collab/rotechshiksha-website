/**
 * Utility to clear any stuck scroll locks left by Radix UI components
 * (Sheet, Dialog, Dropdown, etc.) or navigation changes.
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
  
  // Also check for any Radix overlay remnants
  const overlays = document.querySelectorAll('[data-radix-portal]');
  overlays.forEach((overlay) => {
    if (overlay.childElementCount === 0) {
      overlay.remove();
    }
  });
}
