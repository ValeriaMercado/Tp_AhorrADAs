const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const $btnAdd = $("#btn-add");
const $categories = $("#container-categories");
const $newCategories = $("#categorie");
const $tableCategories = $("#table-categories");

let categories = [
  {
    id: 1,
    nombre: "Comida",
  },

  {
    id: 2,
    nombre: "Servicios",
  },

  {
    id: 3,
    nombre: "Salidas",
  },

  {
    id: 4,
    nombre: "Educacion",
  },

  {
    id: 5,
    nombre: "Trabajo",
  },
];

if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify(categories))
}

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const sendDataFromLocalStorage = (key, array) => {
  return localStorage.setItem(key, JSON.stringify(array))
}

const btnEdit = $$(".btn-edit")
const btnDelete = $$(".btn-delete")

// *******************************************************GENERATE TABLE & REMOVE*********************************
const generateTable = (categories) => {
  for (const category of categories) {
    table.innerHTML += `
    <tr class="w-[20%] h-10 mb-5 categoryColumn"  >
                        <th class="w-[80%] text-start mb-3">${category.id, category.nombre}</th>
                        <th scope="col"><button class= "mr-3 btn-edit text-green-500" data-id="${category.id}" onclick="categorieEdit(${category.id})">Editar</button></th>
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

const categorieEdit = (id) => {
  const nombre = $("#addCategory").value;
  $("#container-categories").classList.add("hidden");
  $("#container-edit-categories").classList.remove("hidden");
  const selectCategory = findCategory(id);
  $("#editCategory").value = `  ${selectCategory.nombre}`;
  $("#btn-editForm").setAttribute("data-id", id);
  $("#btn-cancel").setAttribute("data-id", id);
  $$(".btn-edit").setAttribute("data-id", id)
  $$(".btn-delete").setAttribute("data-id", id)

};



const saveCategoryData = (id) => {
  return {
    id,
    nombre: $("#editCategory").value,
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
  const categoryId = $("#btn-editForm").getAttribute("data-id");
  $("#container-edit-categories").classList.add("hidden")
  $("#container-categories").classList.remove("hidden");
  $("#table").innerHTML = ''


  let categoryEdit = editCategory(parseInt(categoryId))
  localStorage.setItem('categories', JSON.stringify(categoryEdit))


  generateTable(JSON.parse(localStorage.getItem('categories')))

})



$("#btn-cancel").addEventListener("click", () => {
  $("#container-edit-categories").classList.add("hidden");
  $("#container-categories").classList.remove("hidden");

})



//DOM EVENTS
const toggleFilter = $('#toggleFilters')
const containerFilter = $('#filterContainer')
const btnAddOperation = $('#btnAddOperation')
const toggleOperation = $('#toggleOperation')
const toggleOperation2 = $('#toggleOperation2')

toggleFilter.addEventListener("click", (e) => {
  e.preventDefault()
  if (toggleFilter.innerText === 'Ocultar filtros') {
    containerFilter.classList.add('hidden')
    toggleFilter.innerText = 'Mostrar filtros'
  }
  else {
    containerFilter.classList.remove('hidden')
    toggleFilter.innerText = 'Ocultar filtros'
  }
})

btnAddOperation.addEventListener('click', (e) => {
  $("#operations").classList.add("hidden")
  e.preventDefault()
  let operationFromLocal = getDataFromLocalStorage("operations")
  operationFromLocal.push(newOperation())
  sendDataFromLocalStorage("operations", operationFromLocal)
  generateOperationTable(getDataFromLocalStorage("operations"))

})

toggleOperation.addEventListener("click", (e) => {
  e.preventDefault()
  $('#newOperationContainer').classList.remove('hidden')

})

toggleOperation2.addEventListener("click", (e) => {
  e.preventDefault()
  $('#newOperationContainer').classList.remove('hidden')

})


// NEW OPERATION

// let operations = []
if (!localStorage.getItem('operations')) {
  localStorage.setItem('operations', JSON.stringify([]))
}


let newOperation = () => {
  const descriptionOperation = $('#description').value
  const amountOperation = parseInt($('#amountOperation').value)
  const operationType = $('#operationType').value
  const selectCategoryOperation = $('#selectCategoryOperation').value
  const dateOperation = $('#dateOperation').value
  return {
    descriptionOperation,
    amountOperation,
    operationType,
    selectCategoryOperation,
    dateOperation
  }
}



const generateOperationTable = (operations) => {
  $('#tableContainer').innerHTML = ''
  operations.map(operation => {
    $('#tableContainer').innerHTML += `
                <table class=" w-full">
                <tr class="w-full font-light text-center mb-8">
                    <td class="w-1/5 font-bold">${operation.descriptionOperation}</td>
                    <td class="w-1/5 mr-3 btn-edit text-green-500">${operation.selectCategoryOperation}</td>
                    <td class="w-1/5">${operation.dateOperation}</td>
                    <td class="w-1/5"><p>${operation.amountOperation}</p></td>
                    <td class="w-1/5 space-y-1 flex flex-col items-center text-blue-700 ml-[40%]"> <button class="editOperation">Editar</button>
                    <button data-id"${operation.descriptionOperation}">Eliminar</button></td>
                </tr>
                </table>
            `
  })

}


$("#showReports").addEventListener("click", (e) => {
  e.preventDefault()
  $(".reports").classList.remove("hidden")
  $("#tablesAndForms").classList.add("hidden")
  $("#select-box-filtros").classList.add("hidden")
  $("#operationContainer").classList.add("hidden")
  $("#newOperationContainer").classList.add("hidden")
  $("#editOperationContainer").classList.add("hidden")
  $("#container-categories").classList.add("hidden")
  $(".containerNewOp").classList.add("hidden")
})

$("#showCategories").addEventListener("click", (e) => {
  e.preventDefault()
  $("#container-categories").classList.remove("hidden")
  $(".balance-section").classList.add("hidden")
  $("#select-box-filtros").classList.add("hidden")
  $("#operationContainer").classList.add("hidden")
  $("#newOperationContainer").classList.add("hidden")
  $("#editOperationContainer").classList.add("hidden")
  $(".containerNewOp").classList.add("hidden")
  $("operationsAndnewOperation").classList.add("hidden")
  $("operations").classList.add("hidden")
  $("#reports").classList.add("hidden")


})

$("#toggleOperation").addEventListener("click", (e) => {
  $("#tablesAndForms").classList.add("hidden")
  $("#newOperationContainer").classList.remove("hidden")
  newOperation()

})

$("#btnAddOperation").addEventListener("click", (e) => {
  $("#tablesAndForms").classList.remove("hidden")
  $("#newOperationContainer").classList.add("hidden")
  $("#operationContainer").classList.remove("hidden")
  $("#operations").classList.add("hidden")
  generateOperationTable(getDataFromLocalStorage("operations"))
})

$("#container-categories").classList.add("hidden")
$("#reports").classList.remove("hidden")

window.addEventListener("load", () =>{
  generateOperationTable(getDataFromLocalStorage("operations"))
})


