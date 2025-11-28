// Seleccionamos los elementos del HTML
const form = document.getElementById('roofForm');
const resultDiv = document.getElementById('resultado');
const precioSpan = document.getElementById('precioFinal');
const leadForm = document.getElementById('leadForm');
const btnCalcular = document.getElementById('btnCalcular');
const estimadoFinalInput = document.getElementById('estimado_final');

// ----------------------------------------------------
// 1. FUNCIÓN DE CÁLCULO (Primer Click)
// ----------------------------------------------------
function handleCalculationSubmit(e) {
  e.preventDefault(); 
  
  // 1. Capturar Valores
  const area = parseFloat(document.getElementById('area').value);
  const precioMaterial = parseFloat(document.getElementById('material').value);
  const factorPendiente = parseFloat(document.getElementById('pitch').value);
  const factorPisos = parseFloat(document.querySelector('input[name="pisos"]:checked').value);
  const costoArrancando = parseFloat(document.getElementById('material_actual').value); 
  
  // Pequeña validación (si el área es NaN o 0, detenemos la ejecución)
  if (isNaN(area) || area <= 0) {
      alert("Por favor, introduce un área válida.");
      return;
  }

  // 2. La Lógica Matemática (Cálculo del Total)
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

  // ----------------------------------------------------
  // 4. CONTROL DE FLUJO (Transición a Formulario de Lead)
  // ----------------------------------------------------
  
  // 1. Guardamos el resultado en el campo oculto
  estimadoFinalInput.value = rangoTexto;

  // 2. Actualizar el UI
  precioSpan.textContent = rangoTexto;
  btnCalcular.style.display = 'none'; // Esconder el botón de cálculo
  resultDiv.classList.remove('hidden');
  leadForm.classList.remove('hidden');

  // 3. Modificamos el evento del formulario (dentro de handleCalculationSubmit):
  //    * Removemos el listener de cálculo
  form.removeEventListener('submit', handleCalculationSubmit);
  //    * Agregamos un listener simple que solo permite el envío nativo.
  //      Netlify tomará el control del envío aquí.
  form.addEventListener('submit', function(e) {
      // Opcional: Agregar validación final de JS si los campos están vacíos
      const nombre = document.getElementById('nombre').value;
      if (nombre.trim() === "") {
          alert("Por favor, completa tu nombre para recibir el estimado.");
          e.preventDefault(); // Detenemos el envío si la validación falla
      }
      // Si la validación pasa, el envío continúa automáticamente a Netlify.
  });
}

// Nota: La función handleFinalSubmission(e) debe ser eliminada completamente
// de tu archivo main.js ya que Netlify ahora manejará el envío.