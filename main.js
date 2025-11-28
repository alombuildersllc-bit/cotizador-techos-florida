// Seleccionamos los elementos del HTML
// Asegúrate de que todos estos IDs existan en tu index.html
const form = document.getElementById('roofForm');
const resultDiv = document.getElementById('resultado');
const precioSpan = document.getElementById('precioFinal');
const leadForm = document.getElementById('leadForm'); 
const btnCalcular = document.getElementById('btnCalcular'); 
const estimadoFinalInput = document.getElementById('estimado_final'); 
const btnContactar = document.getElementById('btnContactar'); // ID del botón de contacto en el div de resultado

// ----------------------------------------------------
// 1. FUNCIÓN DE CÁLCULO Y CONTROL DE FLUJO
// ----------------------------------------------------
function handleCalculationSubmit(e) {
  // Solo la primera vez, prevenimos el envío para ejecutar el cálculo
  e.preventDefault(); 
  
  // Usamos try...catch para asegurarnos de que el código no rompa el sitio 
  // si un ID falta en el HTML.
  try {
    // 1. Capturar Valores
    const area = parseFloat(document.getElementById('area').value);
    const precioMaterial = parseFloat(document.getElementById('material').value);
    const factorPendiente = parseFloat(document.getElementById('pitch').value);
    // Este selector DEBE encontrar un radio button marcado (checked)
    const factorPisos = parseFloat(document.querySelector('input[name="pisos"]:checked').value);
    const costoArrancando = parseFloat(document.getElementById('material_actual').value); 
    
    // Validación
    if (isNaN(area) || area <= 0) {
        alert("Por favor, introduce un área válida.");
        return;
    }

    // 2. La Lógica Matemática (Cálculo)
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
    estimadoFinalInput.value = rangoTexto;
    precioSpan.textContent = rangoTexto;
    
    if (btnCalcular) {
      btnCalcular.style.display = 'none'; 
    }
    
    resultDiv.classList.remove('hidden');
    leadForm.classList.remove('hidden');

    // ----------------------------------------------------
    // 5. ¡HABILITAR EL ENVÍO A NETLIFY!
    // ----------------------------------------------------
    
    // 5a. Removemos el listener de CÁLCULO
    form.removeEventListener('submit', handleCalculationSubmit);
    
    // 5b. ¡El secreto! Clonamos el formulario para borrar todos los listeners 
    //     que puedan estar interfiriendo, y lo reemplazamos.
    const formClone = form.cloneNode(true);
    form.parentNode.replaceChild(formClone, form);
    
    // ... (Toda la lógica de la Sección 5: Clonación)

    // ... (Tu código de la Sección 5 aquí) ...

    // 5c. El botón Contactar ahora debe ser un submit nativo para Netlify.
    if (btnContactar) {
        btnContactar.textContent = 'Enviar Estimado y Contactar';
    }
  
    // 5d. Cerramos el bloque TRY y abrimos el bloque CATCH
  } catch (error) { // <-- ¡La llave de cierre del TRY y la apertura del CATCH son obligatorias!
    // Capturamos el error
    console.error("Error de Referencia o Cálculo:", error);
    alert("Hubo un error al calcular. Verifique la consola (F12).");
  } 

} // <--- CIERRA LA FUNCIÓN handleCalculationSubmit
// ... (El resto del archivo, el form.addEventListener)

    //git log -1 --oneline