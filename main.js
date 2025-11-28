// Seleccionamos los elementos del HTML
// Asegúrate de que todos estos IDs existan en tu index.html
const form = document.getElementById('roofForm');
const resultDiv = document.getElementById('resultado');
const precioSpan = document.getElementById('precioFinal');
const leadForm = document.getElementById('leadForm'); 
const btnCalcular = document.getElementById('btnCalcular'); 
const estimadoFinalInput = document.getElementById('estimado_final'); 

// ... Todo el código de declaración de variables (const form, etc.) va arriba ...

// ----------------------------------------------------
// 1. FUNCIÓN DE CÁLCULO Y CONTROL DE FLUJO
// ----------------------------------------------------
function handleCalculationSubmit(e) {
  // Solo la primera vez, prevenimos el envío para ejecutar el cálculo
  e.preventDefault(); 
  
  // 1. Capturar Valores (Mismo código de captura)
  const area = parseFloat(document.getElementById('area').value);
  // ... (otras variables)
  
  // Validación
  if (isNaN(area) || area <= 0) {
      alert("Por favor, introduce un área válida.");
      return;
  }

  // 2. La Lógica Matemática (Cálculo)
  // ... (Mismo código de cálculo)
  const total = costoAjustado + permisos + costo_arranque;
  
  // 3. Crear Rango de Salida
  // ... (Mismo código de formato de moneda)
  const rangoTexto = `${formatoMoneda.format(total_minimo)} - ${formatoMoneda.format(total_maximo)}`;

  // 4. CONTROL DE FLUJO (Actualizar UI y Revelar Formulario de Lead)
  estimadoFinalInput.value = rangoTexto;
  precioSpan.textContent = rangoTexto;
  btnCalcular.style.display = 'none'; 
  resultDiv.classList.remove('hidden');
  leadForm.classList.remove('hidden');

  // ----------------------------------------------------
  // 5. ¡HABILITAR EL ENVÍO A NETLIFY! (Corrección Final)
  // ----------------------------------------------------
  
  // 5a. Removemos el listener actual de CÁLCULO
  form.removeEventListener('submit', handleCalculationSubmit);
  
  // 5b. Agregamos un nuevo listener que ya NO bloquea el envío.
  //     Usamos una función anónima simple que no interfiere.
  form.addEventListener('submit', function(event) {
      // Dejamos que el envío nativo ocurra. Netlify capturará los datos.
      // Si quieres validación final, agrégala aquí con event.preventDefault()
      return; 
  });
  
  // 5c. Modificamos el texto y tipo del botón Contactar (si existe)
  const btnContactar = document.getElementById('btnContactar'); 
  if (btnContactar) {
      // El HTML ya lo tiene como submit, solo ajustamos el texto
      btnContactar.textContent = 'Enviar Estimado y Contactar';
  }}