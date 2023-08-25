console.log("Start")
let state = "head_name"
let preState = "head_name"
let statusMode = "normal"
const comment = document.getElementById('comment')
const username = document.getElementById('username')
const reg = document.getElementById('reg')
const grade = document.getElementById('grade')
const submit = document.getElementById('submit')
const reset_btn = document.getElementById('reset_btn')
const tableBody = document.getElementById('tableBody')
const clearTableBtn = document.getElementById('clearTable')
let tableData = []
let savedData = []
let i = 0

// action on submit btn click
const submitAction = () => {
    if (validate()) {
        let data = {
            keyValue: i,
            name: username.value,
            reg: reg.value,
            grade: grade.value
        }
        i++
        tableData.push(data)
        clearForm()
        mainSort(state)
        displayTable(tableData)
        if (tableData.length > 0) {
            clearTableBtn.style.display = "block"
        }
    }
}

// display the input object in the table body
const displayTable = (obj) => {
    tableBody.innerHTML = ""
    let sl = 1
    obj.forEach(element => {
        x = document.createElement('TR')
        x.setAttribute('id', `row${element.keyValue}`)
        x.innerHTML = `<tr>
        <td>${sl}</td>
        <td>${element.name}</td>
        <td>${element.reg}</td>
        <td>${element.grade}</td>
        <td colspan="2">
            <div class="row g-2 ">
                <div id="update${element.keyValue}" class="d-none col-md-6 ">
                    <button class="btn w-100  btn-success"  onclick="updateData(${element.keyValue})">Update</button>
                </div>
                <div id="edit${element.keyValue}" class="d-block col-md-6 ">
                    <button class="btn w-100  btn-primary"  onclick="editData(${element.keyValue})">Edit</button>
                </div>
                <div id="cancel${element.keyValue}" class="d-none col-12 ">
                    <button class="btn w-100 btn-danger"  onclick="cancelEdit(${element.keyValue})">Cancel</button>
                </div>
                <div id="delete${element.keyValue}" class="d-block col-md-6">
                    <button onclick="deleteData(${element.keyValue})" class="btn  w-100 btn-danger" >Delete</button>
                </div>
            </div>
        </td></tr>`
        tableBody.appendChild(x)
        sl++
    });
}

// to delete the row
const deleteData = (keyValue) => {
    if (!statusMode.localeCompare("normal")) {
        tableData.splice(tableData.findIndex(object => {
            return object.keyValue === keyValue
        }), 1)
        displayTable(tableData)
    }
    if (!tableData.length > 0) {
        clearTableBtn.style.display = "none"
    }
}

// sort the object by name
const sortByName = () => {
    tableData = tableData.map(
        array => (
            {
                keyValue: array.keyValue,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.name.localeCompare(b.name))
}

// sort the object by reg
const sortByReg = () => {

    tableData = tableData.map(
        array => (
            {
                keyValue: array.keyValue,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.reg - b.reg)
}

// sort the object by grade
const sortByGrade = () => {
    tableData = tableData.map(
        array => (
            {
                keyValue: array.keyValue,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.grade - b.grade)
}

// validate the input fields
const validate = () => {
    if (username.value === "" || grade.value === "" || reg.value === "") {
        if (grade.value === "") {
            document.getElementById('gradeWarning').innerText = "The Grade field cannot be blank"
            document.getElementById('grade').focus()
        }
        if (reg.value === "") {
            document.getElementById('regNoWarning').innerText = "The Reg field cannot be blank"
            document.getElementById('reg').focus()
        }
        if (username.value === "") {
            document.getElementById('userNameWarning').innerText = "The Name field cannot be blank"
            document.getElementById('username').focus()
        }
        return false
    }
    else return true
}

//  disable username warning
const disableWarning_userName = () => {
    userNameWarning.innerHTML = "";
}

//  disable reg_no warning
const disableWarning_regNo = () => {
    regNoWarning.innerHTML = "";
}

//  disable grade warning
const disableWarning_grade = () => {
    gradeWarning.innerHTML = "";
}

// clear the form
const clearForm = () => {
    document.getElementById('myForm').reset()
}

// reverse the object
const reverseSort = () => {
    tableData.reverse()
}

// sort the object based on state
const mainSort = (state) => {
    if (!state.localeCompare('head_name')) {
        sortByName()
    }
    else if (!state.localeCompare("head_grade")) {
        sortByGrade()
    }
    else if (!state.localeCompare("head_reg")) {

        sortByReg()
    }
}

// sort image toogle
const toggleSortImg = (obj) => {
    s = document.getElementById(obj).getAttribute('src')
    document.getElementById(obj).src = s.localeCompare("down.png") ? "down.png" : "up.png"
    return state
}

// resets the sort image state
const resetStateImg = () => {
    document.getElementById('head_grade').src = "up.png"
    document.getElementById('head_name').src = "up.png"
    document.getElementById('head_reg').src = "up.png"
}

// action on sort btn press
const sortBtnPress = (btn) => {
    if (!state.localeCompare(btn)) {
        toggleSortImg(btn)
        reverseSort()

        displayTable(tableData)
        return
    }
    resetStateImg()
    toggleSortImg(btn)
    state = btn
    mainSort(state)
    displayTable(tableData)
}

// action on edit btn press
const editData = (keyValue) => {
    if (!statusMode.localeCompare("normal")) {
        statusMode = "editing"
        document.getElementById(`edit${keyValue}`).setAttribute('class', 'd-none col-md-6')
        document.getElementById(`delete${keyValue}`).setAttribute('class', 'd-none col-md-6')
        document.getElementById(`cancel${keyValue}`).setAttribute('class', 'd-block col-12')
        let row = document.getElementById(`row${keyValue}`)
        for (i = 1; i < row.cells.length - 1; i++) {
            savedData[i] = row.cells[i].innerHTML
            x = document.createElement('input')
            x.setAttribute('type', 'text')
            x.setAttribute('class', 'w-100')
            x.setAttribute('oninput', `onInputChange(${keyValue})`)
            x.setAttribute('value', row.cells[i].innerHTML)
            row.cells[i].innerHTML = ""
            row.cells[i].appendChild(x)
        }
    }
}

// action on change in input field while editing
const onInputChange = (keyValue) => {
    if (!statusMode.localeCompare("editing")) {
        statusMode = "updating"
        document.getElementById(`update${keyValue}`).setAttribute('class', 'd-block col-md-6 ')
        document.getElementById(`cancel${keyValue}`).setAttribute('class', 'd-block col-md-6 ')
    }
}

// to cancel the edit and update action
const cancelEdit = (keyValue) => {
    statusMode = "normal"
    let row = document.getElementById(`row${keyValue}`)
    dataIndex = tableData.findIndex(object => {
        return object.keyValue === keyValue
    })
    for (i = 1; i < row.cells.length - 1; i++) {
        row.cells[i].innerHTML = savedData[i]
    }
    document.getElementById(`update${keyValue}`).setAttribute('class', 'd-none col-md-6 ')
    document.getElementById(`cancel${keyValue}`).setAttribute('class', 'd-none col-md-6 ')
    document.getElementById(`edit${keyValue}`).setAttribute('class', 'd-block col-md-6 ')
    document.getElementById(`delete${keyValue}`).setAttribute('class', 'd-block col-md-6 ')


}

// update the changed values to the table
const updateData = (keyValue) => {
    statusMode = "normal"
    dataIndex = tableData.findIndex(object => {
        return object.keyValue === keyValue
    })
    let row = document.getElementById(`row${keyValue}`)

    for (i = 1; i < row.cells.length - 1; i++) {
        inputvalue = document.getElementById(`row${keyValue}`).cells[i].childNodes[0].value
        tableData[dataIndex][Object.keys(tableData[dataIndex])[i]] = inputvalue;
        row.cells[i].innerHTML = inputvalue
    }
    clearSearch()
    mainSort(state)
    displayTable(tableData)
}

// action on search
const searchData = () => {
    searchValue = document.getElementById('search').value.toString().trim()
    if (!searchValue.localeCompare(""))
        displayTable(tableData)
    else {
        let result = filterBySearch(tableData, searchValue)
        if (result.length > 0)
            displayTable(result)
        else {
            x = document.createElement('TR')
            x.innerHTML = `<tr><td colspan="6">No result found for the search "${searchValue}"</td></tr>`
            tableBody.innerHTML = ""
            tableBody.appendChild(x)
        }

    }
}

// filters the table-data object by search-value 
const filterBySearch = (arr, searchKey) => {
    return arr.filter((obj) => {
        return Object.keys(obj).some((keyValue) => {
            return obj[keyValue].toString().includes(searchKey);
        })
    });
}

// clears the table values
const clearTableData = () => {
    displayTable(tableData)
    if (confirm("Do you want to clear the table")) {
        clearForm()
        clearSearch()
        tableData = []
        displayTable(tableData)
        clearTableBtn.style.display = "none"
    }
}

// clear the search text
const clearSearch = () => {
    document.getElementById('search').value = ""
}
