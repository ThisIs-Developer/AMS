const show_semester = document.querySelector(".Semester_mob");

const Semester_Menu = document.querySelector("#attendence");

Semester_Menu.addEventListener('click', () => {
    show_semester.style.display = 'flex';
})


const themeToggler=document.querySelector('#mode');
themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variable');
})


// function showTable(sem){
//     let cur_sem="#sem-"+sem;
//     let select_sem = document.querySelector(cur_sem);

//     let show_table=document.querySelector("#table");

//     select_sem.addEventListener('click',() =>{
//         show_table.style.display='block';
//     });
// }


function showTable(sem) {
    let show_table = document.querySelector("#table");
    let main_body = document.querySelector("#main_body");

    // Show the table and hide the main_body
    show_table.style.display = 'block';
    main_body.style.display = 'none';
}

