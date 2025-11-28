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
  // 1. Evitar el envío inicial y capturar valores
  e.preventDefault(); 
  
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
  
  // Ocultamos el botón de cálculo y REVELAMOS las secciones
  if (btnCalcular) {
      btnCalcular.style.display = 'none'; 
  }
  
  resultDiv.classList.remove('hidden');
  leadForm.classList.remove('hidden'); 

  // 5. HABILITAR EL ENVÍO A NETLIFY
  
  // 5a. Método más fuerte: Establecer el onsubmit a null limpia cualquier listener
  // que pueda estar bloqueando el envío.
  form.onsubmit = null;
  
  // 5b. OPCIONAL: Revertimos el listener para el caso de que alguien lo necesite,
  // pero el onsubmit = null es el que hace la limpieza principal.
  form.removeEventListener('submit', handleCalculationSubmit);
  
  // Reemplazamos el botón de Contactar por 'Enviar Estimado'
  const finalButton = document.querySelector('#resultado button[type="submit"]');
  if (finalButton) {
      finalButton.textContent = 'Enviar Estimado y Contactar';
  }
} // <--- Cierre de la función handleCalculationSubmit

// ----------------------------------------------------
// 2. ASIGNACIÓN DEL EVENTO INICIAL
// ----------------------------------------------------

form.addEventListener('submit', handleCalculationSubmit);

    //git log -1 --oneline