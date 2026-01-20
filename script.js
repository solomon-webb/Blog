//Programmed by Solomon; all right reserved. @SoloVibe @copyright
"use strict"
function reg_page() {
       window.location.href = "register.html"
}
function login_page() {
     window.location.href = "index.html"
}
function Register() {
    const username =  document.getElementById("Reg_username").value.trim()
    const mail = document.getElementById("Reg_mail").value.trim();
    const psw = document.getElementById("Reg_psw").value.trim();
    const username_error = document.getElementById("Reg_username_Error");
    const mail_error = document.getElementById("Reg_mail_error");
    const psw_error = document.getElementById("Reg_psw_error");
    const EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const psw_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
    username_error.textContent = "";
    mail_error.textContent  = "";
    psw_error.textContent = "";
    if(username.length <= 3) {
             username_error.textContent = "Username must be more than 3 characters";
             return false;
    }
    if(!EmailPattern.test(mail)) {
        mail_error.textContent = "Invalid Email";
        return false;
    }
    if(!psw_pattern.test(psw)) {
        psw_error.textContent = "password must include letters and number"
        return false;
    }
 const user = {username, mail, psw}
    localStorage.setItem(username, JSON.stringify(user))
     alert(`Welcome ${username}! Registration successful! Please login.`);  
    window.location.href = "index.html";
return false; 
} 
function loginUser() {
    let username = document.getElementById("login_Username").value.trim();
    let psw = document.getElementById("Login_psw").value.trim();
    let overerror = document.getElementById("username_error");
    let pswError = document.getElementById("psw_error")
     const psw_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
   overerror.textContent = "";
   pswError.textContent = "";
       let userData  =JSON.parse(localStorage.getItem(username));
  if(username.length <= 3) {
             overerror.textContent = "Username must be more than 3 characters";
             return false;
    }
       if(!psw_pattern.test(psw)) {
       pswError.textContent = "password must only include letters and number"
        return false;
    }
     
      if(userData && userData.psw == psw) {
             localStorage.setItem('currentUser', username);
             alert(`Login Successful!, welcome ${username}`);
              window.location.href = "main.html";
              }else {
            alert("Invalid Credentials")
          }
        
        return false
}

function showLogin_psw() {
 let psw = document.getElementById("Login_psw");
 if(psw.type === `password`) {
  psw.type = `text`;
 }else {
  psw.type = `password`
 }
 //console.log("done")
}
function showReg_psw() {
 let psw = document.getElementById("Reg_psw");
 if(psw.type === `password`) {
  psw.type = `text`;
 }else {
  psw.type = `password`
 }
// console.log("done")
}
function checkPsw() {
    let username = document.getElementById("login_Username").value.trim();
    let overerror = document.getElementById("username_error");
    let result =  document.getElementById("showPsw");
    let UserData = JSON.parse(localStorage.getItem(username))
    overerror.textContent = "";
    result.textContent = "";

    if(username.length <= 3 ) {
        overerror.textContent = "Username must be more than 3 characters";
        return false;
    }
    if(!UserData) {
        result.textContent = "Username not found"
        return false
    }else {
        result.textContent = `Your password is ${UserData.psw}`
        return false
    }
}


function UploadProfilePic() {
    let file = document.getElementById("fileInput").files[0];
    if(file) {
        let reader = new FileReader();
        reader.onload = function(e) {
                let imgData = e.target.result;
                document.getElementById("profileImg").src = imgData;
                document.getElementById("profileImg").style.display = "block";
                document.getElementById("tip").style.display = 'none';
                document.getElementById("profileIcon").style.display = "none";
                let currentUser = localStorage.getItem('currentUser')
                if(currentUser) {
                    let UserDAta = JSON.parse(localStorage.getItem(currentUser))
                    UserDAta.ProfilePic = imgData;
                    localStorage.setItem(currentUser, JSON.stringify(UserDAta))
                }
        }
        reader.readAsDataURL(file)
    }
}
if(document.getElementById("ProfileNM")) {
  let currentUser =   localStorage.getItem('currentUser') 
  if(currentUser) {
    document.getElementById("ProfileNM").textContent = currentUser
    let userData =  JSON.parse(localStorage.getItem(currentUser));
    if(userData && userData.ProfilePic) {
            document.getElementById("profileImg").src = userData.ProfilePic;
        document.getElementById("profileImg").style.display = "block";
     document.getElementById("tip").style.display = 'none';
     document.getElementById("profileIcon").style.display = "none";
        }
  }
}
document.getElementById("Date").innerHTML = new Date().toDateString()
  function closePostModal() {
    document.getElementById("PostWrapper").style.display = "none";
    document.getElementsByClassName('all')[0].style.filter = "none"
  }
  function ShowPost() {
    document.getElementById("PostWrapper").style.display = "flex";
    document.getElementsByClassName('all')[0].style.filter = "blur(5px)"
  }
  function AddPost() {
    let title = document.getElementById("postTitle").value.trim();
    let category = document.getElementById("PostCategory").value;
    let PostContent = document.getElementById("POstContent").value.trim();
   
    let titleError =  document.getElementById("Title_Error");
    let PostContError =  document.getElementById("PostCont_Error");
    titleError.textContent = "";
    PostContError.textContent = "";
    let currentUser = localStorage.getItem('currentUser')

    if(title.length < 5 ) {
        titleError.textContent = "title must be more than 5 characters long"
        return false
    }
     if (PostContent.length < 10) {
          PostContError.textContent = "Post Content must be more than 10 characters long"
          return false
    }
      
    //continue
  }
  function Preview() {
    let postImage = document.getElementById("postImage").files[0];
    if(postImage) {
        let reader  = new FileReader();
        reader.onload = (e) => {
             document.getElementById("imagePreview").src = e.target.result;
        }
        reader.readAsDataURL(postImage)
    }
  }

  
        function DArkMode() {
            let icon = document.getElementById("Darkmode") ;
            document.body.classList.toggle("dark-mode");

            // Change icon and save preference
            if (document.body.classList.contains("dark-mode")) {
                icon.className = "fas fa-sun";
                localStorage.setItem("darkMode", "enabled");
            } else {
                icon.className = "fas fa-moon";
                localStorage.setItem("darkMode", "disabled");
            }
        }
        
        // Initialize dark mode on page load
        window.addEventListener('DOMContentLoaded', function() {
            const darkModePreference = localStorage.getItem("darkMode");
            const darkModeIcon = document.getElementById("Darkmode");
            
            if (darkModePreference === "enabled") {
                document.body.classList.add("dark-mode");
                if (darkModeIcon) {
                    darkModeIcon.className = "fas fa-sun";
                }
            } else {
                if (darkModeIcon) {
                    darkModeIcon.className = "fas fa-moon";
                }
            }
        });   