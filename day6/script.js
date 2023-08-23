console.log("hi")


const comment = document.getElementById('comment')
const username = document.getElementById('username')
const reg = document.getElementById('reg')
const grade = document.getElementById('grade')
const submit = document.getElementById('submit')
const reset_btn = document.getElementById('reset_btn')
const tableBody = document.getElementById('tableBody')
let tableData = [
    {
        name: "manish",
        id: 5
    },
    {
        name: "caha",
        id: 5
    },
    {
        name: "zz",
        id: 5
    },
    {
        name: "bikash",
        id: 1
    }
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
        console.log(
            tableData
        );
        clearForm()
        sortByName()
        x = document.createElement('TR')
        x.innerHTML = `<tr><td>${tableData.length}</td><td>${data.name}</td><td>${data.reg}</td><td>${data.grade}</td><td colspan="2"><div class="row g-2 "><div class="col-6 justify-content-center"><button class="btn w-100 btn-success" id="edit" onclick="editData(${i})">Edit</button></div><div class="col-6"><button onclick="deleteData(${i})" class="btn w-100 btn-danger" id="edit">Delete</button></div> </div></td></tr>`
        tableBody.appendChild(x)

    }
}




const sortByName = () => {
    console.log(
        tableData
    );
    tableData = tableData.map(
        student => (
            {
                name: student.name,
                id: student.id
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
        student => (
            {
                name: student.name,
                id: student.id
            }
        )
    ).sort((a, b) => a.id - b.id
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