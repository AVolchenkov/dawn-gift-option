const monogramField = document.querySelector("#monogram-input");
const addToCartButton = document.querySelector(".product-form__submit");
var monogramValue = ""

monogramField.addEventListener('input', function (e) {
  monogramValue = e.target.value
  console.log(monogramValue);
})