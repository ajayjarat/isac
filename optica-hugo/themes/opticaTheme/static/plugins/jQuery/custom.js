jQuery(function($) {
  var downloadLink="";
  var baseUrl = window.location.origin;
  $('.team-modal').click(function() {     
    var memberInfo = $(this).attr("data-summary"); 
    var memberTitle = $(this).attr("data-title");             
    $('#teamModal .modal-title').html(memberTitle);
    $('#teamModal .modal-desc').html(memberInfo);    
  });
  $('.request-demo').click(function() { 
    var optionVal = $(this).attr("data-option");              
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
      $.each($('#download-fact-form').serializeArray(), function(i, field) {
        factFormData[field.name]=field.value;
      });
      sendEmail(factFormData, "Download Product Fact Sheet", "enquiry@optica.solutions" );       
    
      /*$.ajax({
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
      });*/
  });
  $("#contactForm").submit(function(event) {               
      event.preventDefault();
      var secretKey = $(this).attr("data-secret");
      // var actionurl = baseUrl+"/php/send_mail.php";  
      var contactData={}; 
      $.each($('#contactForm').serializeArray(), function(i, field) {
        contactData[field.name]=field.value;
      });        
      sendEmail(contactData, "Request Demo", "info@optica.solutions", secretKey );
      /*$.ajax({
          url: actionurl,
          type: 'post',
          data: {
              data:contactData,
              subject: 'Request Demo'
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
      });*/
  });
  $("#homeContactForm").submit(function(event) {          
      event.preventDefault();      
      var formData={};
      var actionurl = baseUrl+"/php/contact.php";        
      $.each($('#homeContactForm').serializeArray(), function(i, field) {
          formData[field.name]=field.value;
      });
      sendEmail(formData, "Request Demo", "enquiry@optica.solutions" );       
      /*$.ajax({
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
      });*/
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
  function sendEmail(data, subject, mailTo, secret ){
    alert(secret);
    var message=""; 
    if (data) { 
      // console.log(data);
      message+="<div>Customer details:</div>";
      $.each(data, function(key,value) {
        message+="<div><p>"+key+":"+value+"</p></div>";
      });           
    }     
    // var SENDGRID_API_KEY= "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";       
    $.ajax({
      beforeSend: function () {          
        jQuery("#loader").show();
      },
      "url": "https://api.sendgrid.com/v3/mail/send",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer $"+secret,
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "personalizations": [
          {
            "to": [
              {
                "email": mailTo
              }
            ]
          }
        ],
        "from": {
          "email": "shalini@jivinc.in"
        },
        "subject": subject,
        "content": [
          {
            "type": "text/plain",
            "value": message
          }
        ]
      }),
      success: function (responseData) {
        if(responseData!=null){
          console.log(response);
        }
      },
      error: function (request, error) {                
        alert("Your message is not sent " + error);      
      }
    });      
  }  


});