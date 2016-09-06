/* ================================ */
/* ADDRESS BOOK IMPLEMENTATION      */
/* Author: Sudha Subramaniam        */
/* E-Mail: s.sudhacse08@gmail.com   */
/* ================================ */

window.onload = function(){	
	/* ===== Form Fields ===== */
	var name = document.getElementById('name');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	/* ===== Buttons ===== */
	var resetBtn = document.getElementById('reset');
	var addBtn = document.getElementById('add');
	var deleteBtn = document.getElementById('delete');
	var sortBtn = document.getElementById('sort');
	/* ===== Table and Div ===== */
	var addressBook = document.querySelector('.address-book');
	var addressForm = document.querySelector('.address-form');
	var addressBookData=[];
		
	showAddressBook();
	/* ===== showing the address book ===== */
	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		}else{
			addressBookData = JSON.parse(localStorage['addbook']);
			for(var n in addressBookData){
				var tr = document.createElement("tr");
				createRow(tr, n, addressBookData);
			}
		}
	}
	/* ===== Button click events ===== */
	addBtn.addEventListener("click", addToBook);
	deleteBtn.addEventListener("click", deleteFromBook);
	resetBtn.addEventListener("click", resetFields);
	sortBtn.addEventListener("click", sortContactList);
	/* ===== Adding value to the address book ===== */
	function addToBook(){
		var errorStringName = checkName();
		var errorStringPhone = checkPhone();
		var errorStringEmail = checkEmail();
		if(errorStringName == '' && errorStringPhone == '' && errorStringEmail == ''){
			var obj = new jsonStructure(name.value,phone.value,email.value)
		    addressBookData.push(obj);
		    localStorage['addbook'] = JSON.stringify(addressBookData);
            addNewlyAddedAddress();
		}else{
			var alertString = 'Check the following -\n' + errorStringName + '\n' + errorStringPhone + '\n' + errorStringEmail;
			alert(alertString);
		}
	}
	/* ===== Deleting the data from the address book ===== */
	function deleteFromBook(){
		var table = document.getElementById('address-book');
		var chekbox = document.getElementsByName('checkboxAddressList');
		addressBookData = JSON.parse(localStorage['addbook']);
		for(var n = chekbox.length - 1; n >= 0; n--){
			if(null != chekbox[n] && true == chekbox[n].checked) {
				table.deleteRow(n);
				addressBookData.splice(n,1);
			}	
		}
		localStorage['addbook'] = JSON.stringify(addressBookData);
	}
	/* ===== sorting the contact list ===== */
	function sortContactList(){
		var sortOrder = document.getElementById('sortOrder');
		var sortOrderValue = sortOrder.options[sortOrder.selectedIndex].value;
		var sortField = document.getElementById('sortField');
		var sortFieldValue = sortField.options[sortField.selectedIndex].value;
		var sortCase = document.getElementById('sortCase');
		var sortCaseValue = sortCase.options[sortCase.selectedIndex].value;
		addressBookData = JSON.parse(localStorage['addbook']);	
		
		if(sortFieldValue == 0 && sortCaseValue == 0){
			addressBookData.sort(caseSensitiveSortBy("name", sortOrderValue));
		}else if(sortFieldValue == 0 && sortCaseValue == 1 ){
			addressBookData.sort(caseInsensitiveSortBy("name", sortOrderValue));
		}else if(sortFieldValue == 1){
			addressBookData.sort(caseSensitiveSortBy("phone", sortOrderValue));
		}else if(sortFieldValue == 2 && sortCaseValue == 0){
			addressBookData.sort(caseSensitiveSortBy("email", sortOrderValue));
		}else if(sortFieldValue == 2 && sortCaseValue == 1){
			addressBookData.sort(caseInsensitivecaseSensitiveSortBy("email", sortOrderValue));
		}
		
		localStorage['addbook'] = JSON.stringify(addressBookData);
		clearTableRows();
		showAddressBook();
	}
	
	function clearTableRows(){
		var table = document.getElementById('address-book');
		while(table.rows.length > 0) {
			table.deleteRow(0);
		}
	}
	
	function caseSensitiveSortBy(prop, sortOrderValue){
		if(sortOrderValue == 0){
			return function(a,b){
				if( a[prop] > b[prop]){
					return 1;
				}else if( a[prop] < b[prop] ){
					return -1;
				}
			  return 0;
			}
		}else{
			return function(b,a){
				if( a[prop] > b[prop]){
					return 1;
				}else if( a[prop] < b[prop] ){
					return -1;
				}
			  return 0;
			}
	    }
	}
	
	function caseInsensitiveSortBy(prop, sortOrderValue){
	    if(sortOrderValue == 0){
			return function(a,b){
				if( a[prop].toLowerCase() > b[prop].toLowerCase()){
					return 1;
				}else if( a[prop].toLowerCase() < b[prop].toLowerCase() ){
					return -1;
				}
			  return 0;
			}
		}else{
			return function(b,a){
				if( a[prop].toLowerCase() > b[prop].toLowerCase()){
					return 1;
				}else if( a[prop].toLowerCase() < b[prop].toLowerCase() ){
					return -1;
				}
			  return 0;
			}
	    }
	}

	function jsonStructure(name,phone,email){
		this.name = name;
		this.phone = phone;
		this.email = email;
	}
	/* =====Adding new value to the address book ===== */
	function addNewlyAddedAddress(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		}else{
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
	/* ===== Validationg the form fields ===== */
	function checkName(){
		var returnValue = 'Please enter a valid name.  It can only contain alphabets';
		if(name.value == null || name.value == ''){
			name.style.borderColor = "red";
		}else{
			var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
			if(name.value.match(letters)){
				name.style.borderColor = "blue";
				returnValue = '';	
			}else{
				name.style.borderColor = "red";
			}
		}
		return returnValue;
	}
	
	function checkPhone(){
		var returnValue = 'Please enter a valid phone number.  It has to contain only numbers and be of the following format xxxxxxxxxx';
		if(phone.value == null || phone.value == ''){
			phone.style.borderColor = "red";
		}else{
			var phoneno = /^\d{10}$/; 
			if(phone.value.match(phoneno)){
				phone.style.borderColor = "blue";
				returnValue = '';
			}else{
				name.style.borderColor = "red";
			}
		}
		return returnValue;
	}
	
	function checkEmail(){
		var returnValue = 'Please enter a valid e-mail.  It has to be of the following format and be of the following format mail@domainname.com';
		if(email.value == null || email.value == ''){
			 email.style.borderColor = "red";	
		}else{
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
            if(email.value.match(mailformat)){  
				email.style.borderColor = "blue";
				returnValue = '';
			}else{
				name.style.borderColor = "red";
			}
		}
		return returnValue;
	}
}
