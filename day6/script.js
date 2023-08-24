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
let tableData = [
];

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
        <div id="edit" class="d-block col-6 justify-content-center"><button class="btn w-100  btn-primary"  onclick="editData(${element.key})">Edit</button></div>
        <div id="cancel" class="d-none col-12 justify-content-center"><button class="btn w-100  btn-danger"  onclick="cancelEdit(${element.key})">Cancel</button></div>
        <div id="update"  class="d-none col-6 justify-content-center"><button class="btn w-100  btn-success" onclick="updateData(${element.key})">Update</button></div>
        <div id="delete" class="d-block col-6"><button onclick="deleteData(${element.key})" class="btn  w-100 btn-danger" >Delete</button></div> </div></td></tr>`
        tableBody.appendChild(x)
        sl++
    });
}

const deleteData = (key) => {
    tableData.splice(tableData.findIndex(object => {
        return object.key === key
    }), 1)
    console.log(tableData)
    displayTable()
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
    // if (sortImg.getAttribute('src').localeCompare("down.png")) {
    //     console.log(
    //         "in"
    //     );
    //     sortImg.src="down.png"
    //     console.log(
    //         sortImg.src
    //     );
    //     tableData.reverse()
    //     displayTable()
    //     return
    // }
    // console.log(
    //    "out"
    // );
    // document.getElementById('head_reg').src = "up.png";
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
// const sortBtnPress = (btn) => {
//     if(!preState.localeCompare(btn)){
//         toggleSortImg(btn)
//         reverseSort()
//         console.log(state)
//         console.log("in")
//         displayTable()
//         return
//     }
//     preState=state
//     resetStateImg()
//     toggleSortImg(btn)
//     state = btn
//     mainSort(state)
//     console.log("out")
//     console.log(state)
//     displayTable()

// }

const editData = (key) => {
    if (!statusMode.localeCompare("normal")) {
        statusMode = "editing"
        document.getElementById('edit').setAttribute('class', 'd-none col-6 justify-content-center')
        document.getElementById('delete').setAttribute('class', 'd-none col-6 justify-content-center')
        document.getElementById('cancel').setAttribute('class', 'd-block col-12 justify-content-center')
        let row = document.getElementById(`row${key}`)
        for (i = 1; i < row.cells.length - 1; i++) {
            x = document.createElement('input')
            x.setAttribute('type', 'text')
            x.setAttribute('class', 'w-100')
            x.setAttribute('oninput', 'onInputChange()')
            x.setAttribute('value', row.cells[i].innerHTML)
            row.cells[i].innerHTML = ""
            row.cells[i].appendChild(x)
        }
    }
}

// const disableBtn=(key)=>{
//     let len= document.getElementById('tableBody').row.length
//     for(i=0;i<len;i++){
//         if(document.getElementById('tableBody').row[i].getAttribute('id')
//     }

// }
// const enableBtn=()=>{
//     if(!statusMode.localeCompare("editing")){
//         statusMode="normal"
//         document.getElementById('edit').setAttribute('class','d-none col-6 justify-content-center')
//         document.getElementById('delete').setAttribute('class','d-none col-6 justify-content-center')
//         document.getElementById('cancel').setAttribute('class','d-block col-12 justify-content-center')
//         let row = document.getElementById(`row${key}`)
//         for (i = 1; i < row.cells.length - 1; i++) {
//             x = document.createElement('td')
//             x.setAttribute('type', 'text')
//             x.setAttribute('class', 'w-100')
//             x.setAttribute('oninput', 'inputChange()')
//             x.setAttribute('value', row.cells[i].innerHTML)
//             row.cells[i].innerHTML = ""
//             row.cells[i].appendChild(x)
//         }
// }


const onInputChange = () => {
    if (!statusMode.localeCompare("editing")) {
        statusMode = "normal"
        document.getElementById('update').setAttribute('class', 'd-block col-6 justify-content-center')
        document.getElementById('cancel').setAttribute('class', 'd-block col-6 justify-content-center')
        // let row = document.getElementById(`row${key}`)
        // for (i = 1; i < row.cells.length - 1; i++) {
        //     x = document.createElement('td')
        //     x.setAttribute('type', 'text')
        //     x.setAttribute('class', 'w-100')
        //     x.setAttribute('oninput', 'inputChange()')
        //     x.setAttribute('value', row.cells[i].innerHTML)
        //     row.cells[i].innerHTML = ""
        //     row.cells[i].appendChild(x)
        // }

    }
}