$(document).ready(function() {
    
    $("#submitQuoteRequest").click(function(e) {
        var formData = $("#contact-form").serialize();
        console.log(formData);

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/contact", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = () => {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log(this.responseText);
                console.log(xhttp.response);
            }
        };
        
        xhttp.send(formData);
    });
    
});