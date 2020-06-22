const app={};

app.innit = () =>{
    app.selectUser();
}

app.selectUser = () =>{
    $("#submitUser").on('click', function(){
        $(".output1").empty();
        $(".output2").empty();
        $(".output3").empty();
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
    if (result.message == "Not Found"|| User == "")
    {
        const htmlstring1=`
        <h2>No Valid User Info Found</h2>`;
        $(".output1").append(htmlstring1);
    }
    else{
        app.displayInfo(result);
    }
    
})}

app.displayInfo =(info) => {
    
    // console.log(info)
    
        const htmlstring1 =`
            <h2> Name: ${info.login}<\h2>
            <img src="${info.avatar_url}" alt="the user's profile picture" width="200" height="200">
            <br>
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
            if (info.public_repos == 0){
                const htmlstring4 = `
                <h3> This user has no public repos... for now...</h3>`;
                $('.output2').append(htmlstring4);
            }
            else{
            app.displayRepos(result);
            }
    })
    
}

app.displayRepos =(info) =>{
    var htmlstring2 =''
    var stylecount = 1;
    var htmlstring3 = `<h3>
    Repo List</h3>`;
    $(".output2").append(htmlstring3);
    if (info)
    info.forEach(repo => {
        if(repo.description ==null){
            htmlstring2=`
        <div class="style${stylecount}">
            <a href=${repo.html_url}> Name: ${repo.name}</a>
        </div>
            `;
            if (stylecount ==5)
            {
                stylecount =1
            }
            else{
                stylecount = stylecount+1;
            }
        }
        else{
            htmlstring2=`
            <div class="style${stylecount}">
                <a href=${repo.html_url}> Name: ${repo.name} <br> Description: ${repo.description}</a>
            </div>
                `;
            if (stylecount ==5)
                {
                    stylecount =1
                }
            else{
                stylecount = stylecount+1;
            }
        }
        
    $(".output2").append(htmlstring2);
    
    });

}







$(function(){
    app.innit();
    
    })
