console.log("hi")


const comment = document.getElementById('comment')
const username = document.getElementById('name')
const reg = document.getElementById('reg')
const grade = document.getElementById('grade')
const submit = document.getElementById('submit')
const clear = document.getElementById('clear')

let sl_no = 0
let name_list = []
let grade_list = []
let reg_list = []

const submitAction = () => {
    console.log(validate())
    if (validate()) {


        // console.log(table.innerHTML)

        if (table.innerHTML == "") {
            let h = document.createElement("h1")
            h.innerText = "Table"
            h.setAttribute("class", "mb-3")
            table.appendChild(h)
            console.log("table created")
            let w = document.createElement("TABLE");
            w.setAttribute("id", "myTable");
            // w.setAttribute("class", "table");
            table.appendChild(w);
            const x = document.createElement("thead");
            const y = document.createElement("tr");
            const z = document.createElement("th");
            z.innerHTML = "SL_NO"
            y.appendChild(z);
            x.appendChild(y);
            w.appendChild(x);
            // z.innerHTML = "Name"
            // y.appendChild(z);
            // x.appendChild(y);
            // w.appendChild(x);
            // z.innerHTML = "Reg"
            // y.appendChild(z);
            // x.appendChild(y);
            // w.appendChild(x);
            // z.innerHTML = "Grade"
            // y.appendChild(z);
            // x.appendChild(y);
            // w.appendChild(x);


        }
    }
}

const createCell=(value)={

}
const validate = () => {
    if (username.value === "" || grade.value === "" || reg.value === "") {
        comment.innerHTML = 'Fill All the inputs';
        return false
    }
    else return true
}

