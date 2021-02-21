let server1="http://locahost:8081/"

//Api request to get all data

function getdata() {
    let xhr=new XMLHttpRequest();
    let url=server1+'memes';
    xhr.open('GET',url);
    xhr.responseType='json';
    xhr.onload = () => {
        let data=xhr.response;
        let list='';
        for(let i=0;i<data.length;i++)
        {
            let dat11=moment(data[i].date).fromNow();
            list=list+`<div class="content">
            <div class="content-text">
                <div class="content-name">${data[i].name}&nbsp;&nbsp;&nbsp;<span class="content-date">(&nbsp;${dat11}&nbsp;)</span></div>
                <div class="content-caption">(&nbsp;${data[i].caption}&nbsp;)</div>
            </div>
            <div class="content-image">
                <img class="content-image1" onerror="this.src='./assets/not-found.png'" src="${data[i].url}" alt="">
            </div>
            <div class="offset-sm-5 offset-4 content-like">
                <button id="likebtn${data[i].id}" onclick="addlike(${data[i].id})" class="btn btn-primary like-button"><span id="likes${data[i].id}">${data[i].likes}</span> Like&nbsp;&nbsp;<i id="likebutton${data[i].id}" class="fas fa-thumbs-up"></i></button>
            </div>
        </div>`
        }
        document.getElementById('page1').innerHTML=list;
    }
    xhr.send();
}

//Api request to post one data

function postdata() {
    let ok1=true;
    let name1 = document.getElementById('name').value;
    let url1 = document.getElementById('url').value;
    let caption1 = document.getElementById('caption').value;
    if(name1 === "")
    {
        alert("Please Enter The Name");
        ok1=false;
    }
    if(url1 === "")
    {
        alert("Please Enter The URL");
        ok1=false;
    }
    if(caption === "")
    {
        alert("Please Enter The Caption");
        ok1=false;
    }
    let xhr=new XMLHttpRequest();
    let data = {
        "name" : name1,
        "url" : url1,
        "caption" : caption1
    }
    let url=server1+'memes';
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        if(xhr.status==201)
        {
            console.log('asddsa')
            location.reload();
        }
        if(xhr.status==409)
        {
            alert('This data already exists');
        }
    }
    if(ok1)
    {
        xhr.send(JSON.stringify(data));
    }
}

//Api request to add a like to the data

function addlike(id) {
    let url=server1+'memelike/'+id;
    let xhr=new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        if(xhr.status==200)
        {
            document.getElementById(`likes${id}`).innerText=xhr.response.likes;
            document.getElementById(`likebtn${id}`).onclick=function () { removelike(id); };
            document.getElementById(`likebtn${id}`).classList.remove("btn-primary");
            document.getElementById(`likebtn${id}`).classList.add("btn-danger");
            document.getElementById(`likebutton${id}`).classList.remove("fa-thumbs-up");
            document.getElementById(`likebutton${id}`).classList.add("fa-thumbs-down");
        }
    }
    xhr.send();
}

//Api request to remove a like to the data

function removelike(id) {
    let url=server1+'memedislike/'+id;
    let xhr=new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        if(xhr.status==200)
        {
            document.getElementById(`likes${id}`).innerText=xhr.response.likes;
            document.getElementById(`likebtn${id}`).onclick=function () { addlike(id); };
            document.getElementById(`likebtn${id}`).classList.add("btn-primary");
            document.getElementById(`likebtn${id}`).classList.remove("btn-danger");
            document.getElementById(`likebutton${id}`).classList.add("fa-thumbs-up");
            document.getElementById(`likebutton${id}`).classList.remove("fa-thumbs-down");
        }
    }
    xhr.send();
}
getdata();