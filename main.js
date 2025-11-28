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
  // 5. ¡HABILITAR EL ENVÍO A NETLIFY! (La Corrección)
  // ----------------------------------------------------
  
  // 5a. Removemos el listener actual de CÁLCULO
  form.removeEventListener('submit', handleCalculationSubmit);
  
  // 5b. Agregamos un nuevo listener que ya NO bloquea el envío, 
  //     permitiendo que Netlify se haga cargo.
  form.addEventListener('submit', function(event) {
      // Simplemente permitimos que el formulario se envíe si no hay más validación
      // Si la validación del nombre, email, etc., pasa, el envío sigue.
      // Netlify captura los datos y te dirige a la página de éxito.
  });
  
  // Opcional: Reemplazar el botón "Calcular" por "Enviar" al final de la lógica
  const btnContactar = document.getElementById('btnContactar'); 
  if (btnContactar) {
      btnContactar.setAttribute('type', 'submit');
      btnContactar.textContent = 'Enviar Estimado y Contactar';
  }
}

// ----------------------------------------------------
// 2. ASIGNACIÓN DEL EVENTO INICIAL (se mantiene igual)
// ----------------------------------------------------

form.addEventListener('submit', handleCalculationSubmit);