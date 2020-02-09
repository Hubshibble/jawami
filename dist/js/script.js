$(document).ready(function() {
    
    $("#submitQuoteRequest").click(function(e) {
        console.log(e);
        $.ajax({
            url: "",
            type: "POST",
            success: function(e) {
                console.log(e);
            }
        });
    });
    
});