function changeImage(){
    var image = document.getElementsByClassName("image")[0];

    if(image.id == 0){
        image.src = "res/phone.png";
        image.id = 1;
    }else{
        image.src = "res/alien.png";
        image.id = 0;
    }
}