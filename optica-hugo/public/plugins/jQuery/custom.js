jQuery(function($) {
    var downloadLink="";
    $('.request-demo').click(function() { 
        var optionVal = $(this).attr("data-option");
        // alert(val);       
        $('#contactModal').show();
        $('.contact-form #purpose').val(optionVal).change();
        // $('.contact-form #purpose').val('Request a Demo').change();
    });

    $('.download-fact-sheet').click(function() { 
        downloadLink = $(this).attr("data-file");          
        $('#downloadFactModal').show(); 
    });

    $("#download-fact-form").on("submit", function(event){
        event.preventDefault();      
        var formData={};
        var actionurl = "../php/send_mail.php";        
        $.each($('#download-fact-form').serializeArray(), function(i, field) {
            formData[field.name]=field.value;
        });      
        $.ajax({
            url: actionurl,
            type: 'post',
            data: {
                data:formData,
                subject: 'Download Product Fact Sheet'
            },    
            success: function(response){
                if(response==1){
                    jQuery('#downloadFactModal .modal-body .download-fact-form').css({"display":"none"});
                    jQuery(".modal-body").html("<div class='text-center'><h5>Your downloadable link is enabled</h5><a class='text-center' href="+downloadLink+">Download fact sheet</a></div>");      
                }              
            },
            error: function (request, error) {
              // alert("AJAX Call Error: " + error);     
              console.log("Your message is not sent " + error);      
            }         
        });
    });

    $("#contactForm").submit(function(e) {          
        event.preventDefault();      
        var formData={};
        var actionurl = "../php/send_mail.php";        
        $.each($('#contactForm').serializeArray(), function(i, field) {
            formData[field.name]=field.value;
        });    
        $.ajax({
            url: actionurl,
            type: 'post',
            data: {
                data:formData,
                subject: 'Requst A Demo'
            },    
            success: function(response){
                if(response==1){
                    $('#contactModal').hide();
                    alert("Your message is sent successfully.")
                }else{
                    alert("Your message is not sent")
                }              
            },
            error: function (request, error) {                
              alert("Your message is not sent " + error);      
            }         
        });
    });

    $("#homeContactForm").submit(function(e) {          
        event.preventDefault();      
        var formData={};
        var actionurl = "../php/send_mail.php";        
        $.each($('#homeContactForm').serializeArray(), function(i, field) {
            formData[field.name]=field.value;
        });    
        $.ajax({
            url: actionurl,
            type: 'post',
            data: {
                data:formData,
                subject: 'Contact email'
            },    
            success: function(response){
                if(response==1){
                    alert("Your message is sent successfully.")
                }else{
                    alert("Your message is not sent")
                }              
            },
            error: function (request, error) {                
              alert("Your message is not sent " + error);      
            }         
        });
    });
});



// jQuery('.download-pdf-button').on('click' , function(event){    
//     var title=$(this).attr('title');
//     //alert(title);
//     var text = $(this).text();
//     jQuery('#popup-modal').modal('show');               
//     // console.log(downloadLink);
//     if($(this).hasClass("download-pdf-button")){
//         $('h5.model-title').text(title);
//         // var id=$(this).attr('id');                       
//         jQuery('#popup-modal .modal-body .our-team-data').css({"display":"none"});
//     }
//     document.addEventListener( 'wpcf7mailsent', function( event ) { 
//       event.preventDefault();
//       if ( '6277' == event.detail.contactFormId ) { 
//         if(downloadLink){                   
//         jQuery('#popup-modal .modal-body .download-pdf-data').css({"display":"none"});
//         jQuery("#popup-modal .modal-body").html("<div class='text-center'><h5>Your downloadable link is enabled</h5><a class='text-center' href="+downloadLink+">Download Product Fact Sheet</a></div>");
//         }
//       } 
//     }, false );
// });
