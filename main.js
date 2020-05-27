
var comunas;
var regions;

async function loadJSON(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function setRegion(){
	const regionField = document.getElementById('regionField');

	regionField.innerHTML = '<option value="">Seleccione una opción</option>';

	for (var i = 0; i <= regions.length - 1; i++) {
		regionField.innerHTML += `<option value="${regions[i].id}">${regions[i].nombre}</option>`;
	}
}

async function setProv() {
	const regionField = document.getElementById('regionField');
	const provField = document.getElementById('provField');
	const regionId = parseInt(regionField.value)
	const filterProv = comunas.filter(element => element.region_id === regionId);

	provField.innerHTML = '<option value="">Seleccione una opción</option>';
	var name="";
	for (var i = 0; i <= filterProv.length - 1; i++) {
		if(name!=filterProv[i].provincia){
			provField.innerHTML += `<option value="${filterProv[i].provincia}">${filterProv[i].provincia}</option>`;
			name=filterProv[i].provincia;
		}
	}
}

async function setComuna() {
	const provField = document.getElementById('provField').value;
	const comunaField = document.getElementById('comunaField');

	for (var i = 0; i <= comunas.length - 1; i++) {
		if(comunas[i].provincia==provField){
			comunaField.innerHTML += `<option value="${comunas[i].nombre}">${comunas[i].nombre}</option>`;
		}
	}
}

async function Llenado() {
	const nameField = document.getElementById('nameField').value;
	const lastNDField = document.getElementById('lastNDField').value;
	const lastNMField = document.getElementById('lastNMField').value;
	const direcField = document.getElementById('direcField').value;
	const regionField = document.getElementById('regionField').value;
	const provField = document.getElementById('provField').value;
	const comunaField = document.getElementById('comunaField').value;

	const valor = document.getElementById('valor').value;

	if(!nameField || !lastNDField || !lastNMField || !direcField || !regionField || !provField || !comunaField){
		return
	}
	
	if (valor=="1"){
		document.getElementById("tableField").insertRow(-1).innerHTML = `<td class="unoN">${nameField}</td><td class="unoN">${lastNDField}</td><td class="unoN">${lastNMField}</td><td class="unoN">${direcField}</td><td class="unoN">${comunaField}</td>`;
		document.getElementById('valor').value="2"
	}else{
		document.getElementById("tableField").insertRow(-1).innerHTML = `<td class="dosN">${nameField}</td><td class="dosN">${lastNDField}</td><td class="dosN">${lastNMField}</td><td class="dosN">${direcField}</td><td class="dosN">${comunaField}</td>`;
		document.getElementById('valor').value="1"
	}

	document.getElementById('nameField').value="";
	document.getElementById('lastNDField').value="";
	document.getElementById('lastNMField').value="";
	document.getElementById('direcField').value="";
	document.getElementById('regionField').value="";
	document.getElementById('provField').value="";
	document.getElementById('comunaField').value="false";
}



async function init() {
	regions = await loadJSON("./assets/json/region.json");
	comunas = await loadJSON("./assets/json/comuna.json");
	setRegion();
	setProv();
	setComuna();
	await Llenado();
}

init()