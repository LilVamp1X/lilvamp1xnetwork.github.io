function showTab(tabId) {
  document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}
