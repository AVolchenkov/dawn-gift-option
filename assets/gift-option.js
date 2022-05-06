const variantLabel = document.querySelector(".product-form__input-js");
const giftOptionContainer = document.querySelector(".gift-option");
const giftOptionCheckbox = document.querySelector("#gift-option-checkbox");

let giftOptionBlock = document.createElement('div');
let giftOptionRadioEmailBlock = document.createElement('div');
let giftOptionRadioAddressBlock = document.createElement('div');

const giftOptionEmailInnerHtml = `
<div class="line-item-property__field gift-option__email-container">
  <label for="gift-option-email-input">Email*</label>
  <input type="email" required name="properties[Email for delivery]" id="gift-option-email-input" value="" placeholder="Email">
</div>
`
const giftOptionAddressInnerHtml = `
<div class="gift-option__address-container">
  <div class="line-item-property__field">
    <label for="gift-option-address-first-name">First name*</label>
    <input type="text" id="gift-option-address-first-name" class="gift-option-address" name="properties[First name]" required value="" autocomplete="given-name" placeholder="First name">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-last-name">Last name*</label>
    <input type="text" id="gift-option-address-last-name" class="gift-option-address" name="properties[Last name]" required value="" autocomplete="family-name" placeholder="Last name">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-company-name">Company</label>
    <input type="text" id="gift-option-address-company-name" class="gift-option-address" name="properties[Company]" value="" autocomplete="organization" placeholder="Company">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-name">Address*</label>
    <input type="text" id="gift-option-address-name" class="gift-option-address" name="properties[Address]" required value="" autocomplete="address-line1" placeholder="Address">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-city-name">City*</label>
    <input type="text" id="gift-option-address-city-name" class="gift-option-address" name="properties[City]" required value="" autocomplete="address-level2" placeholder="City">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-country-name">Country*</label>
    <input type="text" id="gift-option-address-country-name" class="gift-option-address" name="properties[Country]" required value="" placeholder="Country">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-zip">Zip*</label>
    <input type="text" id="gift-option-address-zip" class="gift-option-address" name="properties[Zip]" required value="" autocapitalize="characters" autocomplete="postal-code" placeholder="Zip">
  </div>
  <div class="line-item-property__field">
    <label for="gift-option-address-phone">Phone*</label>
    <input type="tel" id="gift-option-address-phone" class="gift-option-address" pattern="[0-9]{10}" name="properties[Phone]" required value="" autocomplete="tel" placeholder="Phone">
  </div>
</div>
`

const giftOptionInnerHtml = `
<div class="gift-option__content">
<div class="line-item-property__field gift-option__textarea-container">
  <input type="hidden" name="properties[Gift option]" id="gift-option" value="">
  <textarea placeholder="Gift message" id="gift-option-textarea" value="" name="properties[Gift message]"></textarea>
</div>
<div class="gift-option__radio-container gift-option__radio-container--email">
  <input type="radio" id="email-delivery" name="delivery" value="email" required>
  <label for="email-delivery">Email</label>
</div>
<div class="gift-option__radio-container gift-option__radio-container--address">
  <input type="radio" id="paper-card-delivery" name="delivery" value="Paper card" required>
  <label for="paper-card-delivery">Paper card</label>
</div>
</div>`

giftOptionBlock.innerHTML = giftOptionInnerHtml
giftOptionRadioEmailBlock.innerHTML = giftOptionEmailInnerHtml
giftOptionRadioAddressBlock.innerHTML = giftOptionAddressInnerHtml


function giftOptionHandler() {
  giftOptionCheckbox.addEventListener("click", function (e) {
    if (giftOptionCheckbox.checked) {
      giftOptionContainer.append(giftOptionBlock);

      const giftOptionRadioEmail = document.querySelector("#email-delivery");
      const giftOptionRadioEmailContainer = document.querySelector(".gift-option__radio-container--email");
      const giftOptionRadioAddress = document.querySelector("#paper-card-delivery");
      const giftOptionRadioAddressContainer = document.querySelector(".gift-option__radio-container--address");
      const giftOption = document.querySelector("#gift-option");
      giftOption.value = "This is a gift item";
      giftOptionRadioEmail.addEventListener("click", function (e) {
        const giftOptionAddressInputContainer = document.querySelector(".gift-option__address-container");
        if (giftOptionRadioEmail.checked) {
          giftOptionRadioEmailContainer.append(giftOptionRadioEmailBlock);
          if (giftOptionAddressInputContainer != null) {
            giftOptionRadioAddressBlock.remove();
          }
        }
      })
      giftOptionRadioAddress.addEventListener("click", function (e) {
        const giftOptionEmailInputContainer = document.querySelector(".gift-option__email-container");
        if (giftOptionRadioAddress.checked) {
          giftOptionRadioAddressContainer.append(giftOptionRadioAddressBlock)
          if (giftOptionEmailInputContainer != null) {
            giftOptionRadioEmailBlock.remove();
          }
        }
      })
    } else {
      giftOptionBlock.remove()
    }
  })
}

window.addEventListener("load", function () {
  if (giftOptionMetafieldEnable && giftOptionPriceValue >= 5000 && giftOptionCustomerLogin) { // if giftOptionCustomerLogin
    giftOptionContainer.classList.remove("hide")
  }
  giftOptionCheckbox.checked = false;
  giftOptionHandler()
})

variantLabel.addEventListener("click", function () {
  checkVariant()
})

function checkVariant() {
  giftOptionBlock.remove()
  giftOptionCheckbox.checked = false;
  giftOptionContainer.classList.add("hide")
  setTimeout(() => {
    const url = window.location.href
    const variantIdFromUrl = url.split("?variant=")[1]


    if (variantIdFromUrl && giftOptionMetafieldEnable && giftOptionCustomerLogin) { // if giftOptionCustomerLogin 
      fetch(window.Shopify.routes.root + 'products/' + giftOptionProductHandle + '.js')
        .then(response => {
          return response.json()
        })
        .then(data => {
          data.variants.forEach(elem => {
            if (elem.id == variantIdFromUrl) {
              if (elem.price >= 5000) {
                giftOptionContainer.classList.remove("hide")
                giftOptionHandler()
              } else {
                giftOptionContainer.classList.add("hide")
              }
            }
          })
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    }
  }, 500);
}
