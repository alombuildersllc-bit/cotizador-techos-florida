// Seleccionamos los elementos del HTML
// Asegúrate de que todos estos IDs existan en tu index.html
const form = document.getElementById('roofForm');
const resultDiv = document.getElementById('resultado');
const precioSpan = document.getElementById('precioFinal');
const leadForm = document.getElementById('leadForm'); 
const btnCalcular = document.getElementById('btnCalcular'); 
const estimadoFinalInput = document.getElementById('estimado_final'); 

// ----------------------------------------------------
// 1. FUNCIÓN DE CÁLCULO Y CONTROL DE FLUJO
// ----------------------------------------------------
function handleCalculationSubmit(e) {
  // Evitamos que el formulario se envíe inmediatamente al inicio (lo que haría Netlify)
  e.preventDefault(); 
  
  // 1. Capturar Valores
  // **VERIFICACIÓN CRÍTICA**: Asegúrate de que los IDs existan en el HTML
  const area = parseFloat(document.getElementById('area').value);
  const precioMaterial = parseFloat(document.getElementById('material').value);
  const factorPendiente = parseFloat(document.getElementById('pitch').value);
  const factorPisos = parseFloat(document.querySelector('input[name="pisos"]:checked').value);
  const costoArrancando = parseFloat(document.getElementById('material_actual').value); 
  
  // Validación
  if (isNaN(area) || area <= 0) {
      alert("Por favor, introduce un área válida.");
      return;
  }

  // 2. La Lógica Matemática
  const squares = area / 100;
  const wasteFactor = 1.15;
  const squaresReales = squares * wasteFactor;
  const costoBase = squaresReales * precioMaterial;
  const costoAjustado = costoBase * factorPendiente * factorPisos;
  const costo_arranque = squares * costoArrancando;
  const permisos = 500;
  const total = costoAjustado + permisos + costo_arranque;

  // 3. Crear Rango de Salida
  const total_minimo = total * 0.9;
  const total_maximo = total * 1.1;

  const formatoMoneda = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  const rangoTexto = `${formatoMoneda.format(total_minimo)} - ${formatoMoneda.format(total_maximo)}`;

  // 4. CONTROL DE FLUJO (Actualizar UI y Revelar Formulario de Lead)
  
  // Guardamos el resultado en el campo oculto de Netlify
  estimadoFinalInput.value = rangoTexto;

  // Actualizar el UI
  precioSpan.textContent = rangoTexto;
  // Ocultamos el botón de cálculo y mostramos la sección de resultados/leads
  btnCalcular.style.display = 'none'; 
  resultDiv.classList.remove('hidden');
  leadForm.classList.remove('hidden');

  // **IMPORTANTE:** Aquí no modificamos listeners. La próxima vez que el usuario
  // haga clic en 'Contactar un Agente' (que es el botón de envío nativo),
  // el formulario se enviará a Netlify.
}

// ----------------------------------------------------
// 2. ASIGNACIÓN DEL EVENTO INICIAL
// ----------------------------------------------------

// Escucha el evento de envío del formulario. La primera vez, 
// solo ejecuta la función de cálculo (handleCalculationSubmit).
form.addEventListener('submit', handleCalculationSubmit);