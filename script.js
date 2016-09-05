window.onload = function(){
	var name = document.getElementById('name');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	var resetBtn = document.getElementById('reset');
	var addBtn = document.getElementById('add');
	var addressBook = document.querySelector('.address-book');
	var addressForm = document.querySelector('.address-form');

	resetBtn.addEventListener("click", function(){
		name.value = "";
		phone.value = "";
	    email.value = "";
		
	});
	
	addBtn.addEventListener("click", addToBook);
	
	var addressBookData=[];
	
	function jsonStructure(name,phone,email){
		this.name = name;
		this.phone = phone;
		this.email = email;
	}
	
	function addToBook(){
		if(name.value!='' && phone.value!='' && email.value!=''){
			var obj = new jsonStructure(name.value,phone.value,email.value)
		    addressBookData.push(obj);
		    localStorage['addbook'] = JSON.stringify(addressBookData);
            refreshAddressBook();
		}
	}
	
function createRow(tr, n, addressBookData){
		var td=document.createElement("td");
		var td1=document.createElement("td");
		var td2=document.createElement("td");
		var td3=document.createElement("button");
		td.innerHTML = addressBookData[n].name;
		td1.innerHTML = addressBookData[n].phone;
		td2.innerHTML = addressBookData[n].email;
		td3.innerHTML = "Delete";
		
		tr.appendChild(td);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		document.getElementById('address-book').appendChild(tr);
		td3.addEventListener("click", function(){
			document.getElementById('address-book').deleteRow(this);
			addressBookData.splice(this);
			localStorage['addbook'] = JSON.stringify(addressBookData);
		});	
	}
	
	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBookData = JSON.parse(localStorage['addbook']);
			for(var n in addressBookData){
				var tr=document.createElement("tr");
				createRow(tr, n, addressBookData);
			}
		}
	}
	
	function refreshAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBookData = JSON.parse(localStorage['addbook']);
			var n = addressBookData.length - 1;
			var tr=document.createElement("tr");
			createRow(tr, n, addressBookData);
		}
	}
	
	showAddressBook();
}
