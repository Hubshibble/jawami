$(document).ready(function() {
    
    $("#submitQuoteRequest").click(function(e) {
        var formData = $("#contact-form").serialize();
        console.log(formData);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log(xhttp.response);
            // }
        };
        xhttp.open("POST", "http://localhost:3000/contact", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(["Henry","Ford"]);
    });
    
});