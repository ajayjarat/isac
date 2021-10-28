jQuery(function($) {
    var downloadLink="";
    var baseUrl = window.location.origin;
    $('.request-demo').click(function() { 
        var optionVal = $(this).attr("data-option");
        // alert(val);       
        $('#contactModal').show();
        $('#contactForm #purpose').val(optionVal).change();
    });
    $('.download-fact-sheet').click(function() { 
        downloadLink = $(this).attr("data-file");          
        $('#downloadFactModal').show(); 
    });
    $("#download-fact-form").on("submit", function(event){
        event.preventDefault();      
        var factFormData={};
        var actionurl = baseUrl+"/php/send_mail.php";        
        $.each($('#download-fact-form').serializeArray(), function(i, field) {
            factFormData[field.name]=field.value;
        });      
        $.ajax({
            url: actionurl,
            type: 'post',
            data: {
                data:factFormData,
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
    $("#contactForm").submit(function(event) {               
        event.preventDefault();
        var actionurl = baseUrl+"/php/send_mail.php";  
        var contactData={}; 
        $.each($('#contactForm').serializeArray(), function(i, field) {
            contactData[field.name]=field.value;
        });           
        $.ajax({
            url: actionurl,
            type: 'post',
            data: {
                data:contactData,
                subject: 'Requst A Demo'
            },    
            success: function(response){
                if(response==1){
                    $('#contactModal').modal('toggle');
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
    $("#homeContactForm").submit(function(event) {          
        event.preventDefault();      
        var formData={};
        var actionurl = baseUrl+"/php/contact.php";        
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
                alert(host);
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

    window.onscroll = function() {myFunction()};
    var pageHeader = document.getElementById("mainMenu");
    console.log(pageHeader);
    function myFunction(){
        if(window.pageYOffset >= 100){
            pageHeader.classList.add("sticky");
        } else {
            pageHeader.classList.remove("sticky");
        }
    }
});