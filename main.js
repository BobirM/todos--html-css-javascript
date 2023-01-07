let forma = document.querySelector('#forma')
let inpt = document.querySelector('#inp')
let list = document.querySelector('.list')
let modalInp = document.querySelector('#modalInpt')

let data = JSON.parse(localStorage.getItem('listLocal')) ? JSON.parse(localStorage.getItem('listLocal')) : []

data != "" && inner()


forma.addEventListener('submit', function (e) {
  e.preventDefault()
  if (inpt.value.trim() != "") {
    if (data.filter(item => item == inpt.value).length == 0) {
      data.push(inpt.value)
      setLocalStor()
      forma.reset()
      inner()
    } else {
      alert("ToDo already exists")
    }
  } else {
    alert('Please enter your ToDo!!!')
  }
})

function setLocalStor() {
  localStorage.setItem('listLocal', JSON.stringify(data))
}

function inner() {
  document.querySelector('.list').innerHTML = data.map((item, index) => `<li class="liStyle">${item}<span>
  <img data-toggle="modal" data-target="#myModal" id="editIcon" onclick="edit(${index})" src="./icons8-pencil-24.png" alt="">   <img onclick="delet(${index})" id="deleteIcon" src="./icons8-remove-24.png" alt="">
 </span></li>`).join(' ')
}

function delet(i) {
  // 1-method
  data.splice(i, 1)
  setLocalStor()
  inner()

  // 2-method
  // let deleteData = data.filter((item, index) => index != i)
  // data = deleteData
  // setLocalStor()
  // inner()
}

let idEditData = '';
let testInpValue = '';

function edit(i) {
  idEditData = i;
  testInpValue = modalInp.value
  modalInp.value = data.filter((item, index) => index == i)
}

function save() {
  data.splice(idEditData, 1, modalInp.value)
  setLocalStor()
  inner()
}
