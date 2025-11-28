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
    
    // 5a. Removemos el listener actual de CÁLCULO
    form.removeEventListener('submit', handleCalculationSubmit);
    
    // 5b. Agregamos un nuevo listener que ya NO bloquea el envío.
    form.addEventListener('submit', function(event) {
        // El envío nativo continúa, Netlify lo captura.
    });

    // 5c. Modificamos el texto del botón Contactar
    if (btnContactar) {
        // Asumimos que el HTML ya lo tiene como type="submit"
        btnContactar.textContent = 'Enviar Estimado y Contactar';
    }

  } catch (error) {
    // Si la función falla (ej. ReferenceError por ID faltante), alertamos al usuario y registramos el error en la consola.
    console.error("Error de Referencia: La calculadora falló al leer un campo. Asegúrese que todos los IDs del HTML existan y estén escritos correctamente (área, material, material_actual, etc.) y que un radio button 'pisos' esté marcado.", error); 
    alert("Hubo un error al calcular el estimado. Verifique la Consola (F12) para detalles.");
    return;
  }
}

// ----------------------------------------------------
// 2. ASIGNACIÓN DEL EVENTO INICIAL
// ----------------------------------------------------

// Inicialmente, este listener previene el envío y corre el cálculo.
form.addEventListener('submit', handleCalculationSubmit);