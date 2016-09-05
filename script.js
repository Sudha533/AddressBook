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
		var td1 = document.createElement("input");
        td1.type = 'checkbox';
		var td2=document.createElement("td");
		var td3=document.createElement("td");
		var td4=document.createElement("td");
		td2.innerHTML = addressBookData[n].name;
		td3.innerHTML = addressBookData[n].phone;
		td4.innerHTML = addressBookData[n].email;
		
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		document.getElementById('address-book').appendChild(tr);
			
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
