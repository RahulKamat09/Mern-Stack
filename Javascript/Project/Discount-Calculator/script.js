function calculateDiscount() {
    let originalPrice = Number(document.getElementById('o-price').value) || 0;
    let discountValue = Number(document.getElementById('discount').value) || 0;

    let discount = (originalPrice * discountValue) / 100;
    let finalPrice = originalPrice - discount;

    let result1 = document.getElementById('result1');
    let result2 = document.getElementById('result2');

    result1.textContent = finalPrice.toFixed(2);
    result2.textContent = discount.toFixed(2);

    // Add highlight effect
    result1.classList.add("updated");
    result2.classList.add("updated");
    setTimeout(() => {
        result1.classList.remove("updated");
        result2.classList.remove("updated");
    }, 500);
}
