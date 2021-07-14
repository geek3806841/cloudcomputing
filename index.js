// function loadTable() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "https://www.mecallapi.com/api/users");
//   xhttp.send();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       console.log(this.responseText);
//       var trHTML = ''; 
//       const objects = JSON.parse(this.responseText);
//       for (let object of objects) {
//         trHTML += '<tr>'; 
//         trHTML += '<td>'+object['id']+'</td>';
//         trHTML += '<td><img width="50px" src="'+object['avatar']+'" class="avatar"></td>';
//         trHTML += '<td>'+object['fname']+'</td>';
//         trHTML += '<td>'+object['lname']+'</td>';
//         trHTML += '<td>'+object['username']+'</td>';
//         trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
//         trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
//         trHTML += "</tr>";
//       }
//       document.getElementById("mytable").innerHTML = trHTML;
//     }
//   };
// }

// loadTable();


function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://4dqirdobsf.execute-api.us-east-1.amazonaws.com/prod/books");
    xhttp.send();
      console.log(this.responseText);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(
          this.responseText);
        var trHTML = '';
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>';
          trHTML += '<td><img width="80px" src="'+object['image']+'" class="avatar"></td>';
          trHTML += '<td>'+object['name']+'</td>';
          trHTML += '<td>'+object['author']+'</td>';
          trHTML += '<td>'+object['price']+'</td>';
          trHTML += '<td>'+object['category']+'</td>';
          trHTML += '<td>'+object['bookISBN']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete()"><img src="https://img.icons8.com/color/36/000000/mouse-left-click.png"/></button></td>';
          // trHTML += '<td class="fav"> <img class="white-star" src="https://i.postimg.cc/g0b9JG0w/unfav.png" /></td>';
          // trHTML += '<td class="fav"><img class="yellow-star hide" src="https://i.postimg.cc/QN1T9bSH/fav.png" /></td>';
          trHTML += '<td> <img alt="" onclick="ShowUndo()" style="height:50px;" src="https://i.postimg.cc/g0b9JG0w/unfav.png" id="image" /></td>';
          
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  loadTable();




function showUserCreateBox() {
    Swal.fire({
      title: 'Add New Book to your collection',
      html:
        '<input id="id" type="hidden">' +
        '<input id="image" class="swal2-input" placeholder="image">' +
        '<input id="author" class="swal2-input" placeholder="author">' +
        '<input id="name" class="swal2-input" placeholder="name">' +
         '<input id="price" class="swal2-input" placeholder="price">' +
        '<input id="category" class="swal2-input" placeholder="category">' +
        '<input id="bookISBN" class="swal2-input" placeholder="bookISBN">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }

function showBookInformation() {
    Swal.fire({
      title: 'Add New Book to your collection',
      html:
        '<input id="id" type="hidden">' +
        '<input id="image" class="swal2-input" placeholder="image">' +
        '<input id="author" class="swal2-input" placeholder="author">' +
        '<input id="name" class="swal2-input" placeholder="name">' +
         '<input id="price" class="swal2-input" placeholder="price">' +
        '<input id="category" class="swal2-input" placeholder="category">' +
        '<input id="bookISBN" class="swal2-input" placeholder="bookISBN">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    const image = document.getElementById("image").value;
    const author = document.getElementById("author").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const bookISBN = document.getElementById("bookISBN").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://4dqirdobsf.execute-api.us-east-1.amazonaws.com/prod/addbooks");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "image": image, "name": name, "category": category, "bookISBN": bookISBN, "author": author, "price": price,  
      "avatar": "https://www.mecallapi.com/users/cat.png"
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

  function userDelete() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://wggt89lje6.execute-api.us-east-1.amazonaws.com/prod/getcars");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "bookISBN": bookISBN
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }

  function showUserEditBox(bookISBN) {
    console.log(bookISBN);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wggt89lje6.execute-api.us-east-1.amazonaws.com/prod/getcars/"+bookISBN);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Edit Book',
          html:
            '<input id="id" type="hidden" value='+user['bookISBN']+'>' +
            '<input id="name" class="swal2-input" placeholder="First" value="'+user['name']+'">' +
            '<input id="image" class="swal2-input" placeholder="Last" value="'+user['image']+'">' +
            '<input id="category" class="swal2-input" placeholder="Username" value="'+user['category']+'">',
            // '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const bookISBN = document.getElementById("bookISBN").value;
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    // const email = document.getElementById("email").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://www.mecallapi.com/api/users/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
      "avatar": "https://www.mecallapi.com/users/cat.png"
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }