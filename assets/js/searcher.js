let loadTemplateJSON = (result, template) => {
  for (let product of result) {
    template += `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${product.src}" alt="${product.name}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${product.type}</p>
            <a href="javascript:;">
              <h5>
                ${product.name}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${product.price}
            </p>
          </div>
        </div>
      </div>`;
  }
  return template;
};

let loadTemplateXML = (xml, template) => {
  let products = xml.getElementsByTagName("product");
  for (let product of products) {
    let name = product.getElementsByTagName("name")[0].innerHTML;
    let src = product.getElementsByTagName("src")[0].innerHTML;
    let type = product.getElementsByTagName("type")[0].innerHTML;
    let price = product.getElementsByTagName("price")[0].innerHTML;
    template += `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${type}</p>
            <a href="javascript:;">
              <h5>
                ${name}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${price}
            </p>
          </div>
        </div>
      </div>`;
  }
  return template;
};

let loadProducts = (url) => {
  let arreglo = document.getElementsByClassName("row");
  let plantilla = "";

  if (url.includes("json")) {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        plantilla = loadTemplateJSON(result, plantilla);
        arreglo[3].innerHTML += plantilla;
      })
      .catch((error) => console.log(error));
  } else if (url.includes("xml")) {
    fetch(url)
      .then((response) => response.text())
      .then((result) => {
        let xml = new DOMParser().parseFromString(result, "application/xml");
        plantilla = loadTemplateXML(xml, plantilla);
        arreglo[3].innerHTML += plantilla;
      })
      .catch((error) => console.log(error));
  }
};

loadProducts(
  "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json"
);
loadProducts(
  "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml"
);

document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("filter");

  button.addEventListener('click', (event) => {
    let html = "";
    let campo = document.getElementsByClassName("row")[3];
    const reserva = campo.innerHTML.slice();
    let search = document.getElementById("text").value;
      for(let producto of campo.innerHTML){
        if(producto.innerHTML.includes(search))
        html += producto.innerHTML;
      }
    if(search==""){
      campo.innerHTML = reserva;
    } else{
      campo.innerHTML = html;
    }
});    
});