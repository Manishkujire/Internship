console.log("Start")
let state = "head_name"
let statusMode = "normal"
const comment = document.getElementById('comment')
const username = document.getElementById('username')
const reg = document.getElementById('reg')
const grade = document.getElementById('grade')
const submit = document.getElementById('submit')
const reset_btn = document.getElementById('reset_btn')
const tableBody = document.getElementById('tableBody')
const clearTableBtn = document.getElementById('clearTable')
const userNameWarning = document.getElementById('userNameWarning')
const regNoWarning = document.getElementById('regNoWarning')
const gradeWarning = document.getElementById('gradeWarning')

let tableData = []
let savedData = []
let i = 0
// action on submit btn click
const submitAction = () => {
    if (validate(username, reg, grade, userNameWarning, regNoWarning, gradeWarning)) {
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
const validate = (field1, field2, field3, label1, label2, label3) => {
    if (field1.value === "" || field2.value === "" || field3.value === "") {
        if (field3.value === "") {
            label3.style.display = "block"
            field3.focus()
        }
        if (field2.value === "") {
            label2.style.display = "block"
            field2.focus()
        }
        if (field1.value === "") {
            label1.style.display = "block"
            field1.focus()
        }
        return false
    }
    else return true
}

//  disable warning
const disableWarning = (field) => {
    field.style.display = "none"
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
        clearForm()
        statusMode = "editing"
        document.getElementById(`edit${keyValue}`).setAttribute('class', 'd-none col-md-6')
        document.getElementById(`delete${keyValue}`).setAttribute('class', 'd-none col-md-6')
        document.getElementById(`cancel${keyValue}`).setAttribute('class', 'd-block col-12')
        let row = document.getElementById(`row${keyValue}`)
        for (i = 1; i < row.cells.length - 1; i++) {
            savedData[i] = row.cells[i].innerHTML
            x = document.createElement('input')
            x.setAttribute('type', 'text')
            x.setAttribute('id', `inputField_${i}_${keyValue}`)
            x.setAttribute('class', 'w-100')
            if (i == 1)
                x.setAttribute('onkeypress', 'return event.charCode >= 65 && event.charCode <= 122')
            else
                x.setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57')

            x.setAttribute('oninput', `onInputChange(${keyValue});disableWarning(document.getElementById('errorLable_${i}_${keyValue}'));`)
            x.setAttribute('value', row.cells[i].innerHTML)
            row.cells[i].innerHTML = ""
            y = document.createElement('label')
            y.setAttribute('id', `errorLable_${i}_${keyValue}`)
            y.setAttribute('class', 'pt-1 text-danger')
            y.setAttribute('style', 'display:none;')
            y.innerHTML = "Invalid input"
            row.cells[i].appendChild(x)
            row.cells[i].appendChild(y)
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
    let inputA = document.getElementById(`inputField_1_${keyValue}`)
    let inputB = document.getElementById(`inputField_2_${keyValue}`)
    let inputC = document.getElementById(`inputField_3_${keyValue}`)
    let labelA = document.getElementById(`errorLable_1_${keyValue}`)
    let labelB = document.getElementById(`errorLable_2_${keyValue}`)
    let labelC = document.getElementById(`errorLable_3_${keyValue}`)
    console.log(validate(inputA, inputB, inputC, labelA, labelB, labelC))
    if (validate(inputA, inputB, inputC, labelA, labelB, labelC)) {
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
        clearSearchData()
        mainSort(state)
        displayTable(tableData)
    }
}

// action on search
const searchData = () => {
    searchValue = document.getElementById('searchinput').value.toString().trim()
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
        clearSearchData()
        tableData = []
        displayTable(tableData)
        clearTableBtn.style.display = "none"
    }
}

// clear the search text
const clearSearchData = () => {
    document.getElementById('searchinput').value = ""
    displayTable(tableData)
}
