// Seleccionamos los elementos del HTML
const form = document.getElementById('roofForm');
const resultDiv = document.getElementById('resultado');
const precioSpan = document.getElementById('precioFinal');
const leadForm = document.getElementById('leadForm'); 
const btnCalcular = document.getElementById('btnCalcular'); 
const estimadoFinalInput = document.getElementById('estimado_final'); 
const btnContactar = document.getElementById('btnContactar');

// ----------------------------------------------------
// 1. FUNCIÓN DE CÁLCULO Y CONTROL DE FLUJO
// ----------------------------------------------------
function handleCalculationSubmit(e) {
  // Evitamos el envío inicial del formulario para ejecutar el cálculo
  e.preventDefault(); 
  
  // 1. Capturar Valores (Asegúrate de que todos estos IDs existan en tu HTML)
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
  
  // Guardamos el resultado en el campo oculto
  estimadoFinalInput.value = rangoTexto;

  // Actualizar el UI y MOSTRAR LOS CAMPOS DE CONTACTO
  precioSpan.textContent = rangoTexto;
  
  if (btnCalcular) {
      btnCalcular.style.display = 'none'; // Ocultar el botón de cálculo
  }
  
  // ESTA ES LA LÍNEA CLAVE: REVELAR EL FORMULARIO DE CONTACTO
  resultDiv.classList.remove('hidden');
  leadForm.classList.remove('hidden'); 

  // 5. HABILITAR EL ENVÍO A NETLIFY
  
  // Quitamos el listener de cálculo
  form.removeEventListener('submit', handleCalculationSubmit);
  
  // Añadimos un listener simple que no bloquea (permitiendo a Netlify enviar)
  form.addEventListener('submit', function(event) {
      // Dejamos que el envío pase a Netlify
  });
  
  // Cambiamos el texto del botón
  if (btnContactar) {
      btnContactar.textContent = 'Enviar Estimado y Contactar';
  }
}

// ----------------------------------------------------
// 2. ASIGNACIÓN DEL EVENTO INICIAL
// ----------------------------------------------------

form.addEventListener('submit', handleCalculationSubmit);

    //git log -1 --oneline