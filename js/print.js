// Print utilities for the Household Management Dashboard

export function printCurrentPage() {
  // Hide all pages except the active one
  document.querySelectorAll('.dashboard-page').forEach(page => {
    if (!page.classList.contains('is-active')) {
      page.classList.add('print-hidden');
    }
  });

  window.print();

  // Restore after print dialog closes
  setTimeout(() => {
    document.querySelectorAll('.print-hidden').forEach(el => {
      el.classList.remove('print-hidden');
    });
  }, 500);
}

export function printAll() {
  // All pages are in the DOM — print CSS shows them all
  // Remove .print-hidden from any pages that might have it
  document.querySelectorAll('.print-hidden').forEach(el => {
    el.classList.remove('print-hidden');
  });
  window.print();
}
