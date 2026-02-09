document.addEventListener('DOMContentLoaded', function () {
    const precioCosto = document.getElementById('precioCosto');
    const precioVenta = document.getElementById('precioVenta');
    const margenGanancia = document.getElementById('margenGanancia');
    const markup = document.getElementById('markup');
    const resetBtn = document.getElementById('resetBtn');
    const ganancia = document.getElementById('ganancia');

    // Flags to prevent infinite loops during updates
    let isUpdating = false;

    function updateFromCostAndMarkup() {
        if (isUpdating) return;
        isUpdating = true;

        const cost = parseFloat(precioCosto.value) || 0;
        const markupValue = parseFloat(markup.value) || 0;

        if (cost > 0) {
            const price = cost * (1 + markupValue / 100);
            const margin = ((price - cost) / price) * 100;

            precioVenta.value = price.toFixed(2);
            margenGanancia.value = margin.toFixed(2);
            ganancia.value = (price - cost).toFixed(2);
        }

        isUpdating = false;
    }

    function updateFromCostAndMargin() {
        if (isUpdating) return;
        isUpdating = true;

        const cost = parseFloat(precioCosto.value) || 0;
        const margin = parseFloat(margenGanancia.value) || 0;

        if (cost > 0 && margin < 100) {
            const price = cost / (1 - margin / 100);
            const calculatedMarkup = ((price - cost) / cost) * 100;

            precioVenta.value = price.toFixed(2);
            markup.value = calculatedMarkup.toFixed(2);
            ganancia.value = (price - cost).toFixed(2);
        }

        isUpdating = false;
    }

    function updateFromPriceAndCost() {
        if (isUpdating) return;
        isUpdating = true;

        const price = parseFloat(precioVenta.value) || 0;
        const cost = parseFloat(precioCosto.value) || 0;

        if (price > 0 && cost > 0) {
            const margin = ((price - cost) / price) * 100;
            const calculatedMarkup = ((price - cost) / cost) * 100;

            margenGanancia.value = margin.toFixed(2);
            markup.value = calculatedMarkup.toFixed(2);
            ganancia.value = (price - cost).toFixed(2);
        }

        isUpdating = false;
    }

    function updateFromCostAndProfit() {
        if (isUpdating) return;
        isUpdating = true;

        const cost = parseFloat(precioCosto.value) || 0;
        const profit = parseFloat(ganancia.value) || 0;

        if (cost > 0) {
            const price = cost + profit;
            const margin = (profit / price) * 100;
            const calculatedMarkup = (profit / cost) * 100;

            precioVenta.value = price.toFixed(2);
            margenGanancia.value = margin.toFixed(2);
            markup.value = calculatedMarkup.toFixed(2);
        }

        isUpdating = false;
    }

    // Event Listeners
    // Cost change triggers recalc based on active strategy (defaulting to keeping markup constant usually)
    // But to keep it simple: Changing Cost keeps Markup constant and updates Price & Margin
    precioCosto.addEventListener("input", updateFromCostAndMarkup);

    // Changing Markup updates Price & Margin (Cost constant)
    markup.addEventListener("input", updateFromCostAndMarkup);

    // Changing Profit (Ganancia) updates Price, Margin & Markup
    ganancia.addEventListener("input", updateFromCostAndProfit);

    // Changing Margin updates Price & Markup (Cost constant)
    margenGanancia.addEventListener("input", updateFromCostAndMargin);

    // Changing Price updates Margin & Markup (Cost constant)
    precioVenta.addEventListener("input", updateFromPriceAndCost);

    resetBtn.addEventListener("click", () => {
        precioCosto.value = "";
        markup.value = "";
        margenGanancia.value = "";
        precioVenta.value = "";
        ganancia.value = "";
    });
});