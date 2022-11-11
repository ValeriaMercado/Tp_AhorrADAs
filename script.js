const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const $btnAdd = $("#btn-add");
const $categories = $("#container-categories");
const $newCategories = $("#categorie");
const $tableCategories = $("#table-categories");


let defaultCategories = [
  {id: 1, nombre: "Comida",},
  {id: 2, nombre: "Servicios",},
  {id: 3, nombre: "Salidas",},
  {id: 4, nombre: "Educacion",},
  {id: 5, nombre: "Trabajo",}
];


  let categories = localStorage.getItem('categories')? JSON.parse(localStorage.getItem('categories')): defaultCategories;

if (!localStorage.getItem('categories')) {
 localStorage.setItem('categories', JSON.stringify(categories))
}


const btnEdit = $$(".btn-edit")
const btnDelete = $$(".btn-delete")

// *******************************************************GENERATE TABLE & REMOVE*********************************
const generateTable = (categories) => {
  for (const category of categories) {
    table.innerHTML += `
    <tr class="w-[20%] h-10 mb-5 categoryColumn"  >
                        <th class="w-[80%] text-start mb-3">${category.id, category.nombre}</th>
                        <th scope="col"><button class= "mr-3 btn-edit text-green-500" data-id="${category.id}" onclick="categoriesEdit(${category.id})">Editar</button></th>
                        <th scope="col"> <button class= "btnRemove text-red-500" data-id="${category.id}">Eliminar</button></th>
            </tr>
               `
  }

  const btnRemove = $$(".btnRemove")
  for (const btn of btnRemove) {
    const categoryId = btn.getAttribute("data-id")
    btn.addEventListener("click", () => {
      deleteCategory(categoryId)

    })
  }

}

generateTable(JSON.parse(localStorage.getItem('categories')))


// *******************************************************************************************************************************

const categoryInfo = () => {

  const nombre = $("#addCategory").value;
  let id = categories.length + 1

  return {
    id,
    nombre
  };
};


const generateNewCategory = () => {
  if ($("#addCategory").value === "") {
    return alert("Debe ingresar un nombre para la categoría")
  } else {
    table.innerHTML = ''
    categories.push(categoryInfo());
    $("#addCategory").value = ""
    localStorage.setItem('categories', JSON.stringify(categories))
    generateTable(JSON.parse(localStorage.getItem('categories')))

  }
}
$btnAdd.addEventListener("click", generateNewCategory)


$("#addCategory").addEventListener("keypress", (e) => {
  if (e.keyCode == '13') {
    generateNewCategory();
  }
})

const deleteCategory = (categoryId) => {
  table.innerHTML = ''
  let categoriesLocal = JSON.parse(localStorage.getItem('categories'))
  let newCategories = categoriesLocal.filter((category) => {
    return category.id !== parseInt(categoryId)

  })

  categories = newCategories
  localStorage.setItem('categories', JSON.stringify(newCategories))
  generateTable(JSON.parse(localStorage.getItem('categories')))
}

const findCategory = (id) => {
  return categories.find((category) => category.id === id);

};

// ************************EDIT & CANCEL****************************************************************************

const categoriesEdit = (id) => {

  $("#container-categories").classList.add("hidden");
  $("#container-edit-categories").classList.remove("hidden");
  const selectCategory = findCategory(id);
  $("#editName").value = `  ${selectCategory.nombre}`;
  $("#btn-editForm").setAttribute("data-id", id);
  $("#btn-cancel").setAttribute("data-id", id);


};

const saveCategoryData = (id) => {
  return {
    id,
    nombre: $("#editName").value,
  };
};

const editCategory = (id) => {
  return categories.map((category) => {
    if (category.id === parseInt(id)) {
      return saveCategoryData(parseInt(id));
    };
    return category

  });

};

$("#btn-editForm").addEventListener("click", () => {
  const categoriesId = $("#btn-editForm").getAttribute("data-id");
  $("#container-edit-categories").classList.add("hidden")
  $("#container-categories").classList.remove("hidden");
  $("#table").innerHTML = ''


  let categoriesEdit = editCategory(parseInt(categoriesId))
  localStorage.setItem('categories', JSON.stringify(categoriesEdit))
  categories = categoriesEdit;

  generateTable(JSON.parse(localStorage.getItem('categories')))

})

$("#btn-cancel").addEventListener("click", () => {
  $("#container-edit-categories").classList.add("hidden");
  $("#container-categories").classList.remove("hidden");

})


$("#showCategories").addEventListener("click", (e) => {
  e.preventDefault()
  $("#container-categories").classList.remove("hidden")
  $(".balance-section").classList.add("hidden")
  $("#select-box-filtros").classList.add("hidden")
  $("#operationContainer").classList.add("hidden")
  $("#newOperationContainer").classList.add("hidden")
  $("#editOperationContainer").classList.add("hidden")
  $("operations").classList.add("hidden")
  $("#reports").classList.add("hidden")

})



//DOM EVENTS
const toggleFilter = $('#toggleFilters')
const containerFilter = $('#filterContainer')
const btnAddOperation = $('#btnAddOperation')
const toggleOperation = $('#toggleOperation')

const toggleOperation2 = $('#toggleOperation2')


toggleFilter.addEventListener("click", (e) => {
        e.preventDefault()
       if (toggleFilter.innerText === 'Ocultar filtros'){
        containerFilter.classList.add('hidden')
        toggleFilter.innerText = 'Mostrar filtros'
       }
       else {
        containerFilter.classList.remove('hidden')
        toggleFilter.innerText = 'Ocultar filtros'
       }
    })

btnAddOperation.addEventListener('click', (e)=>{
        e.preventDefault()
        operations.push(newOperation())
        addOperation()
        console.log(operations)
})

toggleOperation.addEventListener("click", (e) => {
    e.preventDefault()
    $('#newOperationContainer').classList.remove('hidden')
    
})

toggleOperation2.addEventListener("click", (e) => {
    e.preventDefault()
    $('#newOperationContainer').classList.remove('hidden')
    
})

