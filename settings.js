

function goHome(){

    window.location.href="index.html"

}


function saveSettings() {

    let colour =     document.getElementById("colour").value  
    sessionStorage.setItem("colour" , colour)

    
    let brick_rows =     document.getElementById("brick_rows").value  
    sessionStorage.setItem("brick_rows" , brick_rows)
    

     
    let paddle_width =     document.getElementById("paddle_width").value  
    sessionStorage.setItem("paddle_width" , paddle_width)

    let ball_speed =     document.getElementById("ball_speed").value  
    sessionStorage.setItem("ball_speed" , ball_speed)
}

