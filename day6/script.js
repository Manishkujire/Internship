console.log("hi")
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
let tableData = [];
let savedData=[]
let i = 0

const submitAction = () => {
    if (validate()) {
        console.log(
            document.getElementById('username').value
        );
        let data = {
            key: i,
            name: username.value,
            reg: reg.value,
            grade: grade.value
        }
        i++
        tableData.push(data)
        clearForm()
        mainSort(state)
        displayTable()
    }
}
const displayTable = () => {
    tableBody.innerHTML = ""
    let sl = 1
    tableData.forEach(element => {
        x = document.createElement('TR')
        x.setAttribute('id', `row${element.key}`)
        x.innerHTML = `<tr><td>${sl}</td><td>${element.name}</td><td>${element.reg}</td><td>${element.grade}</td><td colspan="2"><div class="row g-2 ">
        <div id="update${element.key}"  class="d-none col-6 justify-content-center"><button class="btn w-100  btn-success" onclick="updateData(${element.key})">Update</button></div>
        <div id="edit${element.key}" class="d-block col-6 justify-content-center"><button class="btn w-100  btn-primary"  onclick="editData(${element.key})">Edit</button></div>
        <div id="cancel${element.key}" class="d-none col-12 justify-content-center"><button class="btn w-100  btn-danger"  onclick="cancelEdit(${element.key})">Cancel</button></div>
        
        <div id="delete${element.key}" class="d-block col-6"><button onclick="deleteData(${element.key})" class="btn  w-100 btn-danger" >Delete</button></div> </div></td></tr>`
        tableBody.appendChild(x)
        sl++
    });
}

const deleteData = (key) => {
    if (!statusMode.localeCompare("normal")) {
        tableData.splice(tableData.findIndex(object => {
            return object.key === key
        }), 1)
        console.log(tableData)
        displayTable()
    }
}

const inputChange = () => {
    alert("editing")
}


const setState = (newState) => {
    state = newState
}



const sortByName = () => {

    tableData = tableData.map(
        array => (
            {
                key: array.key,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.name.localeCompare(b.name)
    )

}
const sortByReg = () => {

    tableData = tableData.map(
        array => (
            {
                key: array.key,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.reg - b.reg
    )
}


const sortByGrade = () => {
    tableData = tableData.map(
        array => (
            {
                key: array.key,
                name: array.name,
                reg: array.reg,
                grade: array.grade
            }
        )
    ).sort((a, b) => a.grade - b.grade
    )
}

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

const disableWarning_userName = () => {
    userNameWarning.innerHTML = "";
}
const disableWarning_regNo = () => {
    regNoWarning.innerHTML = "";
}
const disableWarning_grade = () => {
    gradeWarning.innerHTML = "";
}

const clearForm = () => {
    document.getElementById('myForm').reset()

}


const reverseSort = () => {
    tableData.reverse()
}

const mainSort = (state) => {
    if (!state.localeCompare('head_name')) {
        sortByName()
        console.log("in name")


    }
    else if (!state.localeCompare("head_grade")) {
        sortByGrade()
        console.log("in grade")
    }
    else if (!state.localeCompare("head_reg")) {
        console.log("in reg")

        sortByReg()
    }
}
const toggleSortImg = (obj) => {
    s = document.getElementById(obj).getAttribute('src')
    document.getElementById(obj).src = s.localeCompare("down.png") ? "down.png" : "up.png"
    return state
}

const resetStateImg = () => {
    document.getElementById('head_grade').src = "up.png"
    document.getElementById('head_name').src = "up.png"
    document.getElementById('head_reg').src = "up.png"
}

const sortBtnPress = (btn) => {
    if (!state.localeCompare(btn)) {
        toggleSortImg(btn)
        reverseSort()
        console.log(state)
        console.log("in")
        displayTable()
        return
    }
    //preState=state
    resetStateImg()
    toggleSortImg(btn)
    state = btn
    mainSort(state)
    console.log("out")
    console.log(state)
    displayTable()

}

const editData = (key) => {
    if (!statusMode.localeCompare("normal")) {
        statusMode = "editing"
        document.getElementById(`edit${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
        document.getElementById(`delete${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
        document.getElementById(`cancel${key}`).setAttribute('class', 'd-block col-12 justify-content-center')
        let row = document.getElementById(`row${key}`)
        for (i = 1; i < row.cells.length - 1; i++) {
            savedData[i]=row.cells[i].innerHTML
            x = document.createElement('input')
            x.setAttribute('type', 'text')
            x.setAttribute('id', `input${i}`)
            x.setAttribute('class', 'w-100')
            x.setAttribute('oninput', `onInputChange(${key})`)
            x.setAttribute('value', row.cells[i].innerHTML)
            row.cells[i].innerHTML = ""
            row.cells[i].appendChild(x)
        }
    }
}

const onInputChange = (key) => {
    if (!statusMode.localeCompare("editing")) {
        statusMode = "updating"
        document.getElementById(`update${key}`).setAttribute('class', 'd-block col-6 justify-content-center')
        document.getElementById(`cancel${key}`).setAttribute('class', 'd-block col-6 justify-content-center')
    }
}


const cancelEdit = (key) => {
    statusMode = "normal"
    let row = document.getElementById(`row${key}`)
    dataIndex = tableData.findIndex(object => {
        return object.key === key
    })
    for (i = 1; i < row.cells.length - 1; i++) {
        row.cells[i].innerHTML = savedData[i]
    }
    document.getElementById(`update${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
    document.getElementById(`cancel${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
    document.getElementById(`edit${key}`).setAttribute('class', 'd-block col-6 justify-content-center')
    document.getElementById(`delete${key}`).setAttribute('class', 'd-block col-6 justify-content-center')


}

const updateData = (key) => {
    statusMode = "normal"
    let row = document.getElementById(`row${key}`)

    for (i = 1; i < row.cells.length - 1; i++) {
        inputvalue = document.getElementById(`input${i}`).value
        row.cells[i].innerHTML = inputvalue
    }
    document.getElementById(`update${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
    document.getElementById(`cancel${key}`).setAttribute('class', 'd-none col-6 justify-content-center')
    document.getElementById(`edit${key}`).setAttribute('class', 'd-block col-6 justify-content-center')
    document.getElementById(`delete${key}`).setAttribute('class', 'd-block col-6 justify-content-center')



}




