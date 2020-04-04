$(document).ready(function() {
    
    $("#submitQuoteRequest").click(function(e) {
        var formData = $("#contact-form").serialize();
        console.log(formData);

        // $.ajax({
        //     url: "http://localhost:3000/contact",
        //     type: "POST",
        //     success: function(e) {
        //         console.log(e);
        //     }
        // });

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            // }
        };
        xhttp.open("POST", "http://localhost:3000/contact", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("fname=Henry&lname=Ford");
    });
    
});