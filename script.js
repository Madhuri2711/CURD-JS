

  
  function randomNumberID(){
    
   // return Math.floor(Math.random());

    return Math.floor(Math.random()*(1000002 - 1 + 1)) + 1;

  }
  $(document).ready( function () {
    getLists();
    document.getElementById('modalSubmit').addEventListener('click', modalSubmit);
  
    function modalSubmit (e) {
      let Id = randomNumberID();
      let name = document.getElementById('add-name').value;
      let email = document.getElementById('add-email').value;
      let dob = document.getElementById('add-dob').value;
      let phone = document.getElementById('add-mobile').value;
      
      const UId = Id+randomNumberID(); //Used to give each product a unique id
      if(name !== '' && email !== ''){
        let newData = {
           id: UId,
          name: name,
          email: email,
          dob: dob,
         phone:phone,
        
         };
  
        //Add new to localStorage. '
        if(localStorage.getItem("List") === null || localStorage.getItem("List") === [] || localStorage.getItem("List") === undefined ){
          let List = [];
          List.push(newData);
          localStorage.setItem("List", JSON.stringify(List));
        } else {
          let List = JSON.parse(localStorage.getItem("List"));
          List.push(newData);
          localStorage.setItem("List", JSON.stringify(List));
        }
       } else{
         alert('All fields are required..');
       }
      getLists();
      document.getElementById("modalSubmit").style.display = "none";
  
     document.getElementById("modalForm").reset();
    
      //resetForm();
      $(".addNewProduct").on('click',FormReset());
  
     e.preventDefault();

    }
    
   
  
  }); //DocumentBody end tag
  
  //get the data stored in the localStorage for display on load
  function getLists() {
    if(localStorage.getItem("List") === null){
        document.getElementById("search").disabled = true;
    } else {
     document.getElementById("search").disabled = false;
      let List = JSON.parse(localStorage.getItem("List"));
      let DataDisplay = document.getElementById('Display');
      //Display result
      DataDisplay.innerHTML = 
        `
        <thead>
                  <tr>
                 <th scope="col">FullName</th>
                    <th scope="col">Email</th>
                    <th scope="col">BirthOfDate</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody >
`;
      for (let i = 0; i < List.length; i++){
        let id = List[i].id;
        let name = List[i].name;
        let email = List[i].email;
        let dob = List[i].dob;
        let phone = List[i].phone;
       
  
        DataDisplay.innerHTML += 
          `    
          <tr>
        
              <td>${name}</td>
              <td>${email}</td>
              <td>${dob}</td>
              <td>${phone}</td>
              <td>
              <a href="#" class="btn btn-primary" onclick="editProduct(${id})" data-toggle="modal" data-target="#addNewProductModal"><i class="fa fa-edit "></i></a>

             <a href="#" class="btn btn-danger" id="deleteId" onclick="deleteProduct(${id})"><i class="fa fa-trash" ></i></a></td>

              </td>
          </tr>
          
          `;
        
        }
      

      }
    }
  
  
  // deleting .
  function deleteProduct(id) {
    let List = JSON.parse(localStorage.getItem("List"));
    for(let i = 0; i < List.length; i++){
      if (List[i].id === id) {
        List.splice(i,1);
        //console.log(List);
      }
    }
    confirm("Are You sure delete this Record?");
    localStorage.setItem("List", JSON.stringify(List)); //reset the values in the local storage
    getLists(); // display.
  }
  

  function editProduct(id) {
    "use strict";
    document.getElementById('modalSubmit').style.display = "none";
    document.getElementById("addNewProductModalLabel").textContent = "Edit Product";
  
    let tempId = id;
    let parentDiv = document.getElementById('modalFooter');
    let List = JSON.parse(localStorage.getItem("List"));
  
  
    if (parentDiv.contains(document.getElementById("editButton"))) {
      document.getElementById('editButton').disabled = false;
    } else {
      let editButton = document.createElement('button');
      editButton.id = "editButton";
      editButton.className = " btn btn-success";
      editButton.textContent = " Update";
      parentDiv.appendChild(editButton);
    }
    for (let i = 0; i < List.length; i++) {
      if (List[i].id === id) {
        document.getElementById("add-name").value = List[i].name;
        document.getElementById("add-email").value = List[i].email;
        document.getElementById("add-dob").value = List[i].dob;
        document.getElementById("add-mobile").value = List[i].phone;
       
      }
    }
  
    document.getElementById("editButton").addEventListener("click", function () {
      addData();
      let List = JSON.parse(localStorage.getItem("List"));
      for(let i = 0; i < List.length; i++){
        if(List[i].id === tempId){
          List.splice(i,1);
        }
      }
      localStorage.setItem("List", JSON.stringify(List));
      getLists();
      document.getElementById("modalForm").reset();
      //resetForm();
      document.getElementById("editButton").style.display = "none";
  
      $(".addNewProduct").on('click',FormReset());
  
    });
  
  }
  

  
  function FormReset() {
    document.getElementById('modalSubmit').style.display = "block";
    document.getElementById("addNewProductModalLabel").textContent = "New Data";
    document.getElementById('editButton').style.display = "none";
  }
  
  function addData() {
    let Id = randomNumberID();
    let name = document.getElementById('add-name').value;
    let email = document.getElementById('add-email').value;
    let dob = document.getElementById('add-dob').value;
    let phone = document.getElementById('add-mobile').value;

    const UId = Id + randomNumberID(); //Used to give each product a unique id
    if (name !== '' && email !== '') {
      let newData = {
        id: UId,
        name: name,
        email: email,
        dob: dob,
        phone: phone
        
      };
      if (localStorage.getItem("List") === null || localStorage.getItem("List") === [] || localStorage.getItem("List") === undefined) {
        let List = [];
        List.push(newData);
        localStorage.setItem("List", JSON.stringify(List));
      } else {
        let List = JSON.parse(localStorage.getItem("List"));
        List.push(newData);
        localStorage.setItem("List", JSON.stringify(List));
    
      }
      //$(".addNewProduct").on('click',FormReset());
  
    }
    $(".addNewProduct").on('click',FormReset());

  }
  
 

