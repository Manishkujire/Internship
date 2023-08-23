console.log("hi")


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
        tableData.push(data)
        clearForm()
        sortByReg()
        displayTable()
    }
}
const displayTable = () => {
    tableBody.innerHTML = ""
    let sl = 1
    tableData.forEach(element => {
        console.log(element)
        x = document.createElement('TR')
        x.setAttribute('id',`row${element.key}`)
        x.innerHTML = `<tr><td>${sl}</td><td>${element.name}</td><td>${element.reg}</td><td>${element.grade}</td><td colspan="2"><div class="row g-2 "><div class="col-6 justify-content-center"><button class="btn w-100 btn-success" id="edit" onclick="editData(${element.key})">Edit</button></div><div class="col-6"><button onclick="deleteData(${element.key})" class="btn w-100 btn-danger" id="edit">Delete</button></div> </div></td></tr>`
        tableBody.appendChild(x)
        i++
    });
}

const deleteData = (key) => {
    tableData.splice(tableData.findIndex(object => {
        return object.key === key
    }),1)
    console.log(tableData)
    displayTable()
}

const inputChange=()=>{
    alert("editing")
}


const editData=(key)=>{
    let row=document.getElementById(`row${key}`)
    for(i=1;i<row.cells.length-1;i++){
        x = document.createElement('input')
        x.setAttribute('type','text')
        x.setAttribute('class','w-100')
        x.setAttribute('oninput','inputChange()')
        x.setAttribute('value',row.cells[i].innerHTML)
        row.cells[i].innerHTML=""
        row.cells[i].appendChild(x)
    }
}

const sortByName = () => {
    console.log(
        tableData
    );
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

    console.log(
        tableData
    );

}
const sortByReg = () => {
    console.log(
        tableData
    );
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

    console.log(
        tableData
    );
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