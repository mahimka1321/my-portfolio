/*
 * Confirmation guard for removing items from Sveltia CMS list widgets.
 * This is a small UI-level workaround because the list widget has no
 * documented `confirm_delete` configuration option.
 */
(() => {
  const CONFIRM_TEXT = 'Удалить этот элемент? Это действие изменит данные проекта после сохранения. Продолжить?';
  const labelsRemoval = /remove\s+(this\s+)?item|удалить\s+(этот\s+)?элемент|удалить/i;
  const bypassOnce = new WeakSet();

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('button,[role="button"]');
    if (!button) return;

    if (bypassOnce.has(button)) {
      bypassOnce.delete(button);
      return;
    }

    const label = [
      button.getAttribute('aria-label'),
      button.getAttribute('title'),
      button.getAttribute('data-tooltip'),
      button.getAttribute('data-testid'),
    ].filter(Boolean).join(' ').toLowerCase();

    // Sveltia's list-widget remove control exposes an accessible label.
    if (!labelsRemoval.test(label)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (window.confirm(CONFIRM_TEXT)) {
      bypassOnce.add(button);
      button.click();
    }
  }, true);
})();
