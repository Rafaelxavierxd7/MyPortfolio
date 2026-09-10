(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var STORAGE_KEY = 'rx-theme';

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable — theme still works for this session */
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  var stored = safeGet(STORAGE_KEY);
  var initial = stored || (systemPrefersDark() ? 'dark' : 'light');
  applyTheme(initial);

  toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    safeSet(STORAGE_KEY, next);
  });

  var mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', function (e) {
      if (!safeGet(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('ativo', entry.isIntersecting);
    });
  }, {
    threshold: 0.15
  });

  elementos.forEach(el => observer.observe(el));
});
