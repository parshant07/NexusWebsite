// Override any magnetic cursor effects
if (typeof window !== 'undefined') {
  // Remove any existing magnetic cursor styles
  const existingCursor = document.querySelector('.magnetic-cursor');
  if (existingCursor) {
    existingCursor.remove();
  }

  // Remove cursor none styles
  const style = document.createElement('style');
  style.textContent = `
    * {
      cursor: auto !important;
    }
    button {
      cursor: pointer !important;
    }
    input, textarea, select {
      cursor: text !important;
    }
    a {
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(style);

  // Override any setupMagneticEffects function
  window.setupMagneticEffects = function() {
    console.log('🧲 Magnetic effects disabled');
  };
}