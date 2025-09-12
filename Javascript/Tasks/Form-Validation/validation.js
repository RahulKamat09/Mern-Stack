function Reg_Form(args) {

    if (args.username.value == "") {
        document.getElementById("msg").innerText = "Username Required!!";
        args.username.focus();
        return false;
    }

    if (!args.username.value.match(/^[a-zA-Z\s]{2,}$/)) {
        document.getElementById("msg").innerText = "Please Enter Only Characters!!";
        args.username.focus();
        return false;
    }

    if (args.password.value == "") {
        document.getElementById("msg").innerText = "Password Required!!";
        args.password.focus();
        return false;
    }

    // if (args.password.value.length < 8) {
    //     document.getElementById("msg").innerText = "Please Enter Minimum 8 digit Password";
    //     args.password.focus();
    //     return false;
    // }

    if (!args.password.value.match(/^[a-z0-9]{4,8}$/)) {
        document.getElementById("msg").innerText = "Please Enter Valid Password";
        args.password.focus();
        return false;
    }

    if (args.email.value == "") {
        document.getElementById("msg").innerText = "E-mail Required!!";
        args.email.focus();
        return false;
    }

    if (!args.email.value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/)) {
        document.getElementById("msg").innerText = "Please Enter Valid Email";
        args.email.focus();
        return false;
    }

    var gender_val = document.getElementsByName("gender");
    if (gender_val[0].checked == true) {

    }
    else if (gender_val[1].checked == true) {

    }
    else {
        document.getElementById("msg").innerText = "Please Select Gender!!";
        return false;
    }

    var cbox = document.getElementsByName("checkbox");
    if (cbox[0].checked == true) {

    }
    else if (cbox[1].checked == true) {

    }
    else if (cbox[2].checked == true) {

    }
    else if (cbox[3].checked == true) {

    }
    else {
        document.getElementById("msg").innerText = "Please Select Atleast One Hobby!!";
        return false;
    }

    if (args.country.value == "") {
        document.getElementById("msg").innerText = "Please Select Country!!";
        args.country.focus();
        return false;
    }

    if (args.address.value == "") {
        document.getElementById("msg").innerText = "Address Field Required!!";
        args.address.focus();
        return false;
    }

    if (args.photo.value == "") {
        document.getElementById("msg").innerText = "Please Select Profile Picture!!";
        args.photo.focus();
        return false;
    }

    var image = document.getElementById("photo");
    var image_size = parseFloat(image.files[0].size / (1024 * 1024)).toFixed(2);
    if (image_size > 2) {
        document.getElementById("msg").innerHTML = "! Please select image size less than 2 MB ";
        str.photo.focus();
        return false;
    }

    if (args.resume.value == "") {
        document.getElementById("msg").innerHTML = "! Please Upload Your Resume";
        args.resume.focus();
        return false;
    }

    var resume = document.getElementById("resume");
    var resume_size_mb = parseFloat(resume.files[0].size / (1024 * 1024)).toFixed(2);
    if (resume_size_mb > 2) {
        document.getElementById("msg").innerHTML = "! Please select resume size less than 2 MB ";
        args.resume.focus();
        return false;
    }
}

function check(file) {

    var filename = file.value;
    var ext = filename.substring(filename.lastIndexOf('.') + 1); // get ext from file name

    if (ext == "jpg" || ext == "png" || ext == "jpeg" || ext == "gif" || ext == "JPG" ||
        ext == "PNG" || ext == "JPEG" || ext == "GIF") {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("submit").disabled = false;
    }
    else {
        document.getElementById("msg1").innerHTML = "! Please upload only JPG , GIF , JPEG File";
        document.getElementById("submit").disabled = true;
    }
}

function check1(file) {

    var filename = file.value;
    var ext = filename.substring(filename.lastIndexOf('.') + 1); // get ext from file name

    if (ext == "pdf" || ext == "PDF") {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("submit").disabled = false;
    }
    else {
        document.getElementById("msg").innerHTML = "! Please upload only PDF File";
        document.getElementById("submit").disabled = true;
    }
} 