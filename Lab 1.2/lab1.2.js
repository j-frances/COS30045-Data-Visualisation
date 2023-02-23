let image = document.getElementsByClassName("image")[0];
let caption = document.getElementsByClassName("table-caption")[0];

function display2019Image(){
    image.src = "res/2019.png";
    image.alt = "Statistics for Australian pet ownership for 2019";
    caption.innerHTML = "Figure 1: Percent of most popular pet owned by Australians in 2019. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>"
}

function display2021Image(){
    image.src = "res/2021.png";
    image.alt = "Statistics for Australian pet ownership for 2021";
    caption.innerHTML = "Figure 2: Percent of most popular pet owned by Australians in 2021. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>";
}

function display20192021Image(){
    image.src = "res/2019-2021.png";
    image.alt = "Statistics for Australian pet ownership from 2019 to 2021";
    caption.innerHTML = "Figure 3: Comparison of most popular pet owned by Australians from 2019 to 2021. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>";
}