jQuery(function($) {
    $('.request-demo').click(function() { 
        var optionVal = $(this).attr("data-option");
        // alert(val);       
        $('#contactModal').show();
        $('.contact-form #purpose').val(optionVal).change();
        // $('.contact-form #purpose').val('Request a Demo').change();
    });

     $('.download-fact-sheet').click(function() { 
        var file = $(this).attr("data-file");          
        $('#downloadFactModal').show(); 
    });
     
    $("#download-fact-form").on("submit", function(event){
        event.preventDefault();
        var formData= $(this).serialize();
        if(formData){
           window.open('/Export/PrintPdf'); 
        }
        // alert(formData);
    })
});
