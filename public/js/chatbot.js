// Cargar el script de Dialogflow dinámicamente
function loadDialogflowWidget() {
  // Crear elemento script
  const script = document.createElement('script');
  script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
  script.onload = initializeWidget;
  document.head.appendChild(script);
}

// Inicializar el widget después de cargar el script
function initializeWidget() {
  // Crear elemento df-messenger
  const dfMessenger = document.createElement('df-messenger');
  
  // Configurar atributos
  dfMessenger.setAttribute('intent', 'WELCOME');
  dfMessenger.setAttribute('chat-title', 'Agente HyperShop');
  dfMessenger.setAttribute('agent-id', '3fe6f901-27d3-490d-93f8-bdba2fdd2887');
  dfMessenger.setAttribute('language-code', 'es');
  
  // Estilos opcionales (puedes personalizar)
  dfMessenger.style.position = 'fixed';
  dfMessenger.style.bottom = '16px';
  dfMessenger.style.right = '16px';
  dfMessenger.style.zIndex = '9999';
  
  // Agregar al cuerpo del documento
  document.body.appendChild(dfMessenger);
}

// Cargar el widget cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDialogflowWidget);
} else {
  loadDialogflowWidget();
}