// "Copy" buttons next to the email address. Hidden until this script runs,
// so visitors without JavaScript never see a button that does nothing.
for (const button of document.querySelectorAll('[data-copy]')) {
  if (!navigator.clipboard) continue;
  button.hidden = false;
  const label = button.querySelector('[data-copy-label]');
  const status = button.parentElement.querySelector('[data-copy-status]');
  let timer;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.dataset.copied = '';
      label.textContent = 'Copied';
      if (status) status.textContent = 'Email address copied.';
    } catch {
      label.textContent = 'Copy failed';
      if (status) status.textContent = 'Could not copy. Select the address and copy it instead.';
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      delete button.dataset.copied;
      label.textContent = 'Copy';
      if (status) status.textContent = '';
    }, 2400);
  });
}
