window.onload = function(){
	var name = document.getElementById('name');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	var resetBtn = document.getElementById('reset');
	var addBtn = document.getElementById('add');
	var deleteBtn = document.getElementById('delete');
	var addressBook = document.querySelector('.address-book');
	var addressForm = document.querySelector('.address-form');
	var addressBookData=[];
		
	showAddressBook();
	
	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBookData = JSON.parse(localStorage['addbook']);
			for(var n in addressBookData){
				var tr = document.createElement("tr");
				createRow(tr, n, addressBookData);
			}
		}
	}
	
	addBtn.addEventListener("click", addToBook);
	deleteBtn.addEventListener("click", deleteFromBook);
	resetBtn.addEventListener("click", resetFields)
	
	function addToBook(){
		if(name.value!='' && phone.value!='' && email.value!=''){
			var obj = new jsonStructure(name.value,phone.value,email.value)
		    addressBookData.push(obj);
		    localStorage['addbook'] = JSON.stringify(addressBookData);
            addNewlyAddedAddress();
		}
	}
	
	function deleteFromBook(){
		var table = document.getElementById('address-book');
		var chekbox = document.getElementsByName('checkboxAddressList');
		addressBookData = JSON.parse(localStorage['addbook']);
		for(var n in chekbox){
			if(null != chekbox[n] && true == chekbox[n].checked) {
				table.deleteRow(n);
				addressBookData.splice(n,1);
			}	
		}
		localStorage['addbook'] = JSON.stringify(addressBookData);
	}
	
	function jsonStructure(name,phone,email){
		this.name = name;
		this.phone = phone;
		this.email = email;
	}
	
	function addNewlyAddedAddress(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBookData = JSON.parse(localStorage['addbook']);
			var n = addressBookData.length - 1;
			var tr=document.createElement("tr");
			createRow(tr, n, addressBookData);
		}
	}
	
	function createRow(tr, n, addressBookData){
		var td1 = document.createElement("input");
		td1.type = 'checkbox';
		td1.name = 'checkboxAddressList'
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
	
	function resetFields(){
		name.value = "";
		phone.value = "";
	    email.value = "";
	}
}
