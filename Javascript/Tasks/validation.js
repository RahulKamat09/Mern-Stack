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

    if (!args.password.value.match(/^[A-Z]+[a-z0-9]{4,8}$/)) {
        document.getElementById("msg").innerText = "Please Enter Valid Password";
        args.password.focus();
        return false;
    }

    if (args.email.value == "") {
        document.getElementById("msg").innerText = "E-mail Required!!";
        args.email.focus();
        return false;
    }

    if (!args.email.value.match(/^([a-zA-Z0-9_\.\])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/)) {
        document.getElementById("msg").innerText = "Please Enter Valid Email";
        args.email.focus();
        return false;
    }

    var gender_val = document.getElementsByName("gender");
    if(gender_val[0].checked == true){

    }
    else if(gender_val[1].checked == true){

    }
    else{
        document.getElementById("msg").innerText= "Please Select Gender!!";
        return false;
    }
}