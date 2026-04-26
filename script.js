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
}
function showReg_psw() {
 let psw = document.getElementById("Reg_psw");
 if(psw.type === `password`) {
  psw.type = `text`;
 }else {
  psw.type = `password`
 }
}
 let result =  document.getElementById("showPsw");
function checkPsw() {
    let username = document.getElementById("login_Username").value.trim();
    let overerror = document.getElementById("username_error");
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
        result.textContent = UserData.psw
        result.onclick = copy();
        return false
    }
    

}

function copy() {
    if(! localStorage.getItem('currentUser')) {
       navigator.clipboard.writeText(result.textContent)
       .then(()=> alert(`password copied`)) 
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
 function closePostModal() {
    document.getElementById("PostWrapper").style.display = "none";
    document.getElementsByClassName('all')[0].style.filter = "none"
    document.getElementById("form_group").reset()
  }
  function ShowPost() {
    document.getElementById("PostWrapper").style.display = "flex";
    document.getElementsByClassName('all')[0].style.filter = "blur(5px)"
     document.getElementById("form_group").reset()
  }
  function AddPost() {
    let title = document.getElementById("postTitle").value.trim();
    let category = document.getElementById("PostCategory").value;
    let PostContent = document.getElementById("POstContent").value.trim();
   let postImage = document.getElementById("postImage");
    let titleError =  document.getElementById("Title_Error");
    let PostContError =  document.getElementById("PostCont_Error");
    titleError.textContent = "";
    PostContError.textContent = "";
    let currentUser = localStorage.getItem('currentUser')
if(!currentUser) {
    alert('please login to create a post') 
    return  false
}
    if(title.length < 5 ) {
        titleError.textContent = "title must be more than 5 characters long"
        return false
    }
     if (PostContent.length < 10) {
          PostContError.textContent = "Post Content must be more than 10 characters long"
          return false
    }
    let imageData = null;
    if(postImage.files && postImage.files[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
     imageData = e.target.result ;

    savePost(title,category,PostContent,currentUser,imageData)
        }
        reader.readAsDataURL(postImage.files[0])
    }else {
       savePost(title,category,PostContent,currentUser,null)
    }
    
    return false
  }
function savePost(title,category,PostContent,currentUser,imageData) {
       let post = {
          id: Date.now(),
          title: title,
          category: category,
          content: PostContent,
          author: currentUser,
          image: imageData,
          date: new Date().toLocaleDateString(),
       views: 0,
       likes: [],
       commentList: []
       }
       let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
       posts.unshift(post);
       localStorage.setItem('blogPosts', JSON.stringify(posts));
        alert("Post published successfully!");
        closePostModal();
        DisplayPost()
}
function DisplayPost() {
       let PostCont = document.getElementById("postsContainer"); 
       let user = localStorage.getItem('currentUser');
       let posts = JSON.parse(localStorage.getItem('blogPosts')) || []
       if(posts.length === 0) {
        PostCont.innerHTML = `<div class="post_card">
                <div class="post-image" style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px;"><img src="IMG-20251104-WA0004.jpg" alt="" style="border-radius: 15px;width: 200px;height: 200px;"></div> 
        <div class="title">
                <h3>Welcome to My Blog Posts</h3>
               <i class="fas fa-calendar" style="color: #7353AD;"><span id="MYOwnDate" style="padding-left: 15px; font-size: smaller;"></span></i>  
            </div>
              <div class="category">
                <button>Technology</button>
            </div>
            <div class="description">
                <p>My name is Solomon @SoloVibe, is just the beginning of my blogging journey, I will be sharing m experiences and insights on various topics</p>
            </div> 
            <hr>
            <div class="rlm">
                <div class="cm">
                    <span><i class="fas fa-eye"></i> 1</span>
                                       </div>
            </div>
        </div>`;
        return;
    }
       PostCont.innerHTML = posts.map(post => {
               return `     <div class="post_card">
                  <div class="post-image" style="display: flex;justify-content: center;align-items: center;"><img src="${post.image || ''}" alt="" style="border-radius: 15px;width: 300px;height: 300px;"></div> 
        <div class="title">
                <h3>${post.title}</h3>
              <span id="Date"> <i class="fas fa-calendar" style="color: #7353AD;"></i> ${post.date} </span>
            </div>
              <div class="category">
                <button>${post.category} </button>
            </div>
            <div class="description">
                <p>${post.content.substring(0,200)}${post.content.length > 200 ? '....' : ''}</p>
            </div> 
            <hr>
            <div class="rlm">
                <div class="rm">
                <p> <a href="#" onclick="viewPost(${post.id});return false">Read More</a></p>
                </div>
                <div class="cm">
                     <i class="fas fa-trash" onclick="deletePost(${post.id}); return false"></i>    
                </div>
        </div>
    </div>`
       }).join('')
}
function deletePost(postId) {
    if(confirm("Are you sure you want to delete this post?")) {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
      DisplayPost()
    }
}
function viewPost(PostId){
   let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === PostId);
    if(post) {
        post.views++;
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        alert(`${post.title}\n\nBy ${post.author} on ${post.date}\n\nCategory: ${post.category}\n\n${post.content}`);
        DisplayPost();
    }
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
  function feedbackPreview() {
    let postImage = document.getElementById("Feebackimage").files[0];
    if(postImage) {
        let reader  = new FileReader();
        reader.onload = (e) => {

             document.getElementById("FeedbackimagePreview").src = e.target.result;
        }
        reader.readAsDataURL(postImage)
    }
  }
        function DArkMode() {
            let icon = document.getElementById("Darkmode") ;
            document.body.classList.toggle("dark-mode");
     if( document.body.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun"
        localStorage.setItem('darkMode','enable')
     }else { 
        icon.className = "fas fa-moon"
        localStorage.setItem('darkMode','disabled')
     }
        }
        window.addEventListener('DOMContentLoaded', () => {
            let DarkmodePReference = localStorage.getItem('darkMode');
            let icon = document.getElementById("Darkmode");

            if(DarkmodePReference === 'enable') {
                  document.body.classList.add('dark-mode');
                  icon.className = "fas fa-sun"
            }else {
                 document.body.classList.remove('dark-mode');
                  icon.className = "fas fa-moon"
            }
      DisplayPost()
        })
        function SendFeedback() {
            let FeebackContent = document.getElementById("feedbackContent").value.trim();
            let feedbackName = document.getElementById("feedbackNAme").value.trim();
               let number = '08165164319';
            let text = `Hello my name is ${feedbackName}; message: ${FeebackContent};`
            let link = `https://wa.me/${number}?text=${decodeURIComponent(text)}`
            window.open(link)
                }
        function ShowFeeback() {
              let y = document.getElementById("Feeback").style.display = 'flex';
             let x=    document.getElementsByClassName('all')[0];
             x.style.filter = "blur(5px)"
        }
        function closeFeeback() {
                 let y = document.getElementById("Feeback").style.display = 'none';
                   let x=    document.getElementsByClassName('all')[0];
             x.style.filter = "none"
              document.getElementById("Feebackform").reset()
        }
  if(localStorage.getItem('currentUser')) {
                document.getElementById("showlogOUt").style.display = 'block'
                console.log("you are log in")
            }else {
                 document.getElementById("showlogOUt").style.display = 'none'
                   console.log("you are not log in")
            }
        function LogOUT() {
            if(confirm('are you sure you want to log out')) {
            localStorage.removeItem('currentUser')
            window.location.href = 'index.html';     
           // return true      
        }
    }
    //    document.getElementById('Date').innerHTML = new Date().toDateString()
    let FeebackCont =document.getElementById("Feeback")
    let ContactCont = document.getElementById("Contact")
     let PostCont = document.getElementById("PostWrapper")
    if(FeebackCont ||PostCont  || ContactCont) {
        window.onclick = function(e) {
            if(e.target === FeebackCont || e.target === PostCont || e.target === ContactCont) {
                closeFeeback()
                   closePostModal()
                   closeContact()
            }
        }
    }
    function Contact() {
       // let number = '08165164319'
        let link = `https://wa.me/08165164319`;
        window.open(link, '_blank')
    }
    function ShowContact() {        
              let y = document.getElementById("Contact").style.display = 'flex';
             let x=    document.getElementsByClassName('all')[0];
             x.style.filter = "blur(5px)"
    }
    function closeContact() {
           let y = document.getElementById("Contact").style.display = 'none';
             let x=    document.getElementsByClassName('all')[0];
             x.style.filter = "none"
    }
   setTimeout(() => {
    document.getElementById("Contact").style.display = 'flex'; 
    let x=    document.getElementsByClassName('all')[0];
             x.style.filter = "blur(5px)"

   },   30000  );
   document.getElementById('year').innerHTML = new Date().getFullYear();
    
           let protocol= document.location.protocol;
            if(protocol === 'file:' || protocol === 'http:'  ) {
             alert("Try Dey Get Sense; Don't Copy My Code")
          window.close()

          }