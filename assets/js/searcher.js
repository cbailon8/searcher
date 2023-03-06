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

let load = () => {
  campo.innerHTML = "";
  loadProducts(
    "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
  );
  loadProducts(
    "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml"
  );
}

let campo = document.getElementsByClassName("row")[3];
load();
let button = document.getElementById("filter");

button.addEventListener("click", (event) => {
  let html = "";
  let productos = document.getElementsByClassName(
    "col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4"
  );

  let search = document.getElementById("text").value;
  for (let producto of productos) {
    if (producto.innerHTML.includes(search)) html += producto.outerHTML;
  }
  if (search == "") {
    load();
  } else {
    campo.innerHTML = html;
  }
});
