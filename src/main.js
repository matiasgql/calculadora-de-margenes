document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('priceForm');
    const precioCosto = document.getElementById('precioCosto');
    const precioVenta = document.getElementById('precioVenta');
    const margenGanancia = document.getElementById('margenGanancia');
    const markup = document.getElementById('markup');
    const result = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcular();
    });

    function calcular() {
        let costo = parseFloat(precioCosto.value) || 0;
        let venta = parseFloat(precioVenta.value) || 0;
        let margen = parseFloat(margenGanancia.value) || 0;
        let mark = parseFloat(markup.value) || 0;

        // Contar cuántos campos están llenos
        let camposLlenos = 0;
        if (costo > 0) camposLlenos++;
        if (venta > 0) camposLlenos++;
        if (margen > 0) camposLlenos++;
        if (mark > 0) camposLlenos++;

        if (camposLlenos < 2) {
            alert('Por favor, completa al menos 2 campos para calcular');
            return;
        }

        // Cálculos basados en los campos disponibles
        if (costo > 0 && venta > 0) {
            // Calcular margen y markup desde costo y venta
            margen = ((venta - costo) / venta) * 100;
            mark = ((venta - costo) / costo) * 100;
        } else if (costo > 0 && margen > 0) {
            // Calcular venta y markup desde costo y margen
            venta = costo / (1 - margen / 100);
            mark = ((venta - costo) / costo) * 100;
        } else if (costo > 0 && mark > 0) {
            // Calcular venta y margen desde costo y markup
            venta = costo * (1 + mark / 100);
            margen = ((venta - costo) / venta) * 100;
        } else if (venta > 0 && margen > 0) {
            // Calcular costo y markup desde venta y margen
            costo = venta * (1 - margen / 100);
            mark = ((venta - costo) / costo) * 100;
        } else if (venta > 0 && mark > 0) {
            // Calcular costo y margen desde venta y markup
            costo = venta / (1 + mark / 100);
            margen = ((venta - costo) / venta) * 100;
        }

        const ganancia = venta - costo;

        // Actualizar los campos del formulario
        precioCosto.value = costo.toFixed(2);
        precioVenta.value = venta.toFixed(2);
        margenGanancia.value = margen.toFixed(2);
        markup.value = mark.toFixed(2);

        // Mostrar resultados
        document.getElementById('resultCosto').textContent = '$' + costo.toFixed(2);
        document.getElementById('resultVenta').textContent = '$' + venta.toFixed(2);
        document.getElementById('resultMargen').textContent = margen.toFixed(2) + '%';
        document.getElementById('resultMarkup').textContent = mark.toFixed(2) + '%';
        document.getElementById('resultGanancia').textContent = '$' + ganancia.toFixed(2);

        result.classList.add('show');
    }

    window.resetForm = function() {
        form.reset();
        result.classList.remove('show');
    }
});