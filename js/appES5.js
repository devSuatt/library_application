function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI constructor
function UI() {
}

UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById('course-list');

    var html = `
        <tr>
            <td><img src="images/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td> <a href="#" class="btn btn-danger btn-sm delete">Delete</a> </td>
        </tr>
    `;

    list.innerHTML += html;
}

UI.prototype.clearControl = function () {
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";
}

UI.prototype.deleteCourse = function (element) {
    if (confirm('Are you sure?')) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }
}

UI.prototype.showAlert = function (message, className) {
    var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `

    const row = document.querySelector('.row');
    row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);

}

const form = document.getElementById('new-course');
form.addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //create course object
    const course = new Course(title, instructor, image);

    // create UI
    const ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complete the form', 'warning');
    }
    else {
        // add course to list
        ui.addCourseToList(course);

        // clear controls
        ui.clearControl();

        ui.showAlert('Course has been added', 'success');
    }

    e.preventDefault();
});

document.getElementById('course-list').addEventListener('click', function (e) {

    console.log("clicked");
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('the course has been deleted', 'danger');

});


