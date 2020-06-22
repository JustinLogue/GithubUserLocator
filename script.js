const app={};

app.innit = () =>{
    app.selectUser();
}

app.selectUser = () =>{
    $("#submitUser").on('click', function(){
        $(".output").empty();
        const User= $('#user').val();

        console.log("You entered: ", User);
        app.GetUser(User);

    })
}

app.GetUser =(User) =>{
    $.ajax({
        url: 'https://api.github.com/users/'+User,
    method : 'GET',
    dataType: 'json',
    
    }).then(result => {
    const UserApi= 'https://api.github.com/users/'+User;
    const RepoApi = 'https://api.github.com/users/'+User+'/repos/';
    console.log("Searching for: ", result);
    app.displayInfo(result);
    
})}

app.displayInfo =(info) => {
    // console.log(info)
    const htmlstring1 =`
        <h2> Name: ${info.login}<\h2>
        <img src="${info.avatar_url}" alt="the user's profile picture" width="200" height="200">
        <a href=${info.html_url}>Go To Their Profile</a>
        <p>Followers: ${info.followers}<br>
        Following: ${info.following}<br>
        Repos: ${info.public_repos}
        </p>
    `;
    $(".output1").append(htmlstring1);
    $.ajax({
        url: 'https://api.github.com/users/'+info.login+'/repos',
        method : "GET",
        dataType: 'json',
    }).then(result => {
        app.displayRepos(result);
    })
}

app.displayRepos =(info) =>{
    var stylecount = 1;
    info.forEach(repo => {
        console.log(repo.name);
        const htmlstring2=`
        <div class="${stylecount}">
            <a href=${repo.html_url}> Name: ${repo.name} Description: ${repo.description}</a>
        </div>
            `;
    $(".output2").append(htmlstring2);
    });

}







$(function(){
    app.innit();
    
    })
