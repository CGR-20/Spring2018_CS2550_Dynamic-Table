var profiles = [];
var table = document.getElementById("myTable");
var form = document.getElementById("myForm");
var form2 = document.getElementById("myForm2");
var selectedPerson;

function addPerson()
{
    var inputs = form2.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) 
            {
                switch (inputs[i].type) 
                {
                    case 'text':
                        inputs[i].value = '';
                        break;
                    case 'tel':
                        inputs[i].value = '';
                        break;
                    case 'email':
                        inputs[i].value = '';
                        break;
                }
        	}
        	
    $('#myModal2').modal('toggle');
}

$("#myForm2").submit(function(event)
{
    event.stopPropagation();
    event.preventDefault();
    
    var firstName = $("#firstName2").val();
    var lastName = $("#lastName2").val();
    var city = $("#city2").val();
    var state = $("#state2").val();
    var zip = $("#zip2").val();
    var address = $("#address2").val();
    var phone = $("#phoneNumber2").val();
    var email = $("#Email2").val();
    
    if (profiles.length == 0)
    {
        profiles.push(new Person("Name", "", "Address", "", "", "", "Cell Phone", "Email Address", "ID", "Edit", "Delete"));
    }
    
    // add object to array
    profiles.push(new Person(firstName, lastName, address, city, state, zip, phone, email, "", "", ""));
     // add array to local storage
    window.localStorage.setItem("profilesArray", JSON.stringify(profiles));
    
    $('#myModal2').modal('hide');
    $("#myTable").html("");
    $(table).empty();
    makeTable(table, profiles);
});

function deleteAll()
{
    if (confirm("Are you sure you want to delete the entire table?"))
		{
		    profiles = [];
		    $(table).empty();
		    window.localStorage.setItem("profilesArray", 'null');
		    makeTable(table, profiles);
		}
	else
		return false;
}

function Person(first, last, address, city, state, zip, cell, email, id, edit, del)
{
    this.fullname = first + " " + last;
    this.fullAddress = address + " " + city + ", " + state + " " + zip;
    this.cell = cell;
    this.email = email;
    this.id = id;
    this.edit = edit;
    this.del = del;
    this.firstName = first;
    this.lastName = last;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
}

function createTable()
{
    // get existing persons from local storage and push into profiles here
    if (typeof(Storage) !== "undefined") 
    {
        if (window.localStorage.getItem("profilesArray") !== null) 
        {
            profiles=JSON.parse(window.localStorage.getItem("profilesArray"));
        }
    } 
    else 
    {
        alert("Sorry! No Web Storage support.");
    }
    makeTable(table, profiles);
}

function makeTable(container, profiles)
{
    if (profiles.length == 0)
    {
        var warning = document.createElement('p');
        warning.innerHTML = "There is nothing in the table";
        warning.setAttribute('align', "center");
        container.appendChild(warning);
    }
    else
    {
        var tableX, tbody;
        $(container).addClass('table-responsive');
        
        tableX = document.createElement('table');
        $(tableX).addClass('table');
        $(tableX).addClass('table-hover');
        $(tableX).addClass('table-bordered');
        $(tableX).addClass('table-striped');
        
        tbody = document.createElement('tbody');
        
        var currProfile, row, profileInfo;
        var x, i, cell, tag;
        var xx = 0, ii = 0;
        
        for (x in profiles)
        {
            currProfile = profiles[x];
            row = document.createElement('tr');
    
            for (i = 0; i < 7; i++)
            {
                profileInfo = Object.values(currProfile)[ii];
                
                if (xx == 0)
                    cell = document.createElement('th');
                else
                    cell = document.createElement('td');
     
                if (xx == 0 || ii != 5 && ii != 6)
                    tag = document.createElement('p');
                else if (ii == 5 || ii == 6)
                {
                    tag = document.createElement('a');
                    tag.setAttribute('href', "#");
                    tag.setAttribute('style', "display:block; font-size:20px");
                    if (ii == 5)
                    {
                        tag.setAttribute('onClick', "editID('"+xx+"')");
                        $(tag).addClass('fa fa-pencil');
                    }
                    else
                    {
                        tag.setAttribute('onClick', "deleteID('"+xx+"')");
                        $(tag).addClass('fa fa-eraser');
                    }
                }
                if (xx == 0 && ii == 1)
                    tag.innerHTML = "Address";
                else
                    tag.innerHTML = profileInfo;
                    
                if (ii == 4)
                    tag.setAttribute('style', "visibility:hidden");
                    
                tag.setAttribute('align', "center");
                cell.appendChild(tag);
                row.appendChild(cell);
                ii++;
            }
            currProfile.id = xx;
            
            tbody.appendChild(row);
            xx++;
            ii = 0;
        }
        tableX.appendChild(tbody);
        container.appendChild(tableX);
    }
}

function editID(x)
{
    selectedPerson = getPerson(x);
    var firstName = Object.values(selectedPerson)[7];
    var lastName = Object.values(selectedPerson)[8];
    var address = Object.values(selectedPerson)[9];
    var city = Object.values(selectedPerson)[10];
    var state = Object.values(selectedPerson)[11];
    var zip = Object.values(selectedPerson)[12];
    var phone = Object.values(selectedPerson)[2];
    var email = Object.values(selectedPerson)[3];
    
    // open modal here
    $('#myModal').modal('toggle');
    
    // fill form with information found in person object
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#address").val(address);
    $("#city").val(city);
    $("#state").val(state);
    $("#zip").val(zip);
    $("#phoneNumber").val(phone);
    $("#Email").val(email);
}

$("#myForm").submit(function(event)
{
    event.stopPropagation();
    event.preventDefault();
    
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var address = $("#address").val();
    var phone = $("#phoneNumber").val();
    var email = $("#Email").val();

    // change information in array to whatever the user entered
    selectedPerson.fullname = firstName + " " + lastName;
    selectedPerson.fullAddress = address + " " + city + ", " + state + " " + zip;
    selectedPerson.cell = phone;
    selectedPerson.email = email;
    selectedPerson.firstName = firstName;
    selectedPerson.lastName = lastName;
    selectedPerson.address = address;
    selectedPerson.city = city;
    selectedPerson.state = state;
    selectedPerson.zip = zip;
    
    // update local storage
    window.localStorage.setItem("profilesArray", JSON.stringify(profiles));
    
    $('#myModal').modal('hide');
    $("#myTable").html("");
    $(table).empty();
    makeTable(table, profiles);
});

function cancelWarning()
{
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm("Are you sure you want to cancel?"))
		{
			$('#myModal').modal('hide');
			$('#myModal2').modal('hide');
			
            // clearing inputs
            var inputs = form.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) 
            {
                switch (inputs[i].type) 
                {
                    case 'text':
                        inputs[i].value = '';
                        break;
                    case 'tel':
                        inputs[i].value = '';
                        break;
                    case 'email':
                        inputs[i].value = '';
                        break;
                }
        	}
        	
        	inputs = form2.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) 
            {
                switch (inputs[i].type) 
                {
                    case 'text':
                        inputs[i].value = '';
                        break;
                    case 'tel':
                        inputs[i].value = '';
                        break;
                    case 'email':
                        inputs[i].value = '';
                        break;
                }
        	}
		}
	else
		return false;
}

function deleteID(x)
{
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm("Are you sure you want to delete this person?"))
		{
		    profiles.splice(x,1);
			$(table).empty();
			if (profiles.length == 1)
			    profiles.length = 0;
			
			// update local storage
            window.localStorage.setItem("profilesArray", JSON.stringify(profiles));
			
			makeTable(table, profiles);
		}
	else
		return false;
}

function getPerson(x)
{
    return profiles[x];
}