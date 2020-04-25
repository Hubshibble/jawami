$(document).ready(function() {
    
    $("#submitQuoteRequest").click(function(e) {
        var formData = $("#contact-form").serialize();
        console.log(formData);
        $.ajax({
            url: "",
            type: "POST",
            success: function(e) {
                console.log(e);
            }
        });
    });
    
});