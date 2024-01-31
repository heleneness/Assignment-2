class Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity) {
	  this.productName = productName;
	  this.productID = productID;
	  this.manufacturer = manufacturer;
	  this.expirationDate = expirationDate;
	  this.quantity = quantity;
	}
}

class PharmacyInventory {
	constructor() {
	  this.medicines = [];
	  this.loadInventory();
	}

	addMedicine(medicine) {
	  this.medicines.push(medicine);
	  this.saveInventory();
	}

	deleteMedicine(productID) {
	  this.medicines = this.medicines.filter(medicine => medicine.productID !== productID);
	  this.saveInventory();
	}

	displayMedicines() {
	  const tableBody = document.querySelector("#medicineTable tbody");
	  tableBody.innerHTML = "";

	  this.medicines.forEach(medicine => {
		const row = document.createElement("tr");
		row.innerHTML = `
		  <td>${medicine.productName}</td>
		  <td>${medicine.productID}</td>
		  <td>${medicine.manufacturer}</td>
		  <td>${medicine.expirationDate}</td>
		  <td>${medicine.quantity}</td>
		  <td><button onclick="deleteMedicine('${medicine.productID}')">Delete</button></td>
		`;
		tableBody.appendChild(row);
	  });
	}

	saveInventory() {
	  localStorage.setItem('pharmacyInventory', JSON.stringify(this.medicines));
	}

	loadInventory() {
	  const storedInventory = localStorage.getItem('pharmacyInventory');
	  if (storedInventory) {
		this.medicines = JSON.parse(storedInventory);
	  }
	}
}

const pharmacyInventory = new PharmacyInventory();

function addMedicine(event) {
	event.preventDefault();

	const productName = document.querySelector("#productName").value;
	const productID = document.querySelector("#productID").value;
	const manufacturer = document.querySelector("#manufacturer").value;
	const expirationDate = document.querySelector("#expirationDate").value;
	const quantity = document.querySelector("#quantity").value;

	const medicine = new Medicine(productName, productID, manufacturer, expirationDate, quantity);
	pharmacyInventory.addMedicine(medicine);
	pharmacyInventory.displayMedicines();

	document.querySelector("#medicineForm").reset();
}

function deleteMedicine(productID) {
	pharmacyInventory.deleteMedicine(productID);
	pharmacyInventory.displayMedicines();
}

document.querySelector("#medicineForm").addEventListener("submit", addMedicine);
