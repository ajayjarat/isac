jQuery(function($) {
  var downloadLink="";
  var baseUrl = window.location.origin;
  var secretKey="";
  $('.team-modal').click(function() {     
    var memberInfo = $(this).attr("data-summary"); 
    var memberTitle = $(this).attr("data-title");             
    $('#teamModal .modal-title').html(memberTitle);
    $('#teamModal .modal-desc').html(memberInfo);    
  });
  $('.request-demo').click(function() { 
    var optionVal = $(this).attr("data-option");
    secretKey=$(this).attr("data-secret");
    $('#contactModal').show();
    $('#contactForm #purpose').val(optionVal).change();
  });    
  $('.download-fact-sheet').click(function() { 
    downloadLink = $(this).attr("data-file"); 
    secretKey=$(this).attr("data-secret-key");         
    $('#downloadFactModal').show(); 
  });
  $("#download-fact-form").on("submit", function(event){
      event.preventDefault();      
      var factFormData={};                
      $.each($('#download-fact-form').serializeArray(), function(i, field) {
        factFormData[field.name]=field.value;
      });
      sendEmail(factFormData, "Download Product Fact Sheet", "enquiry@optica.solutions", secretKey );
  });
  $("#contactForm").submit(function(event) {               
      event.preventDefault();
      var contactData={}; 
      $.each($('#contactForm').serializeArray(), function(i, field) {
        contactData[field.name]=field.value;
      });        
      sendEmail(contactData, "Request Demo", "info@optica.solutions", secretKey );
  });
  $("#homeContactForm").submit(function(event) {          
      event.preventDefault();      
      var formData={};
      $.each($('#homeContactForm').serializeArray(), function(i, field) {
        formData[field.name]=field.value;
      });
      sendEmail(formData, "Request Demo", "enquiry@optica.solutions", secretKey );
  });
  window.onscroll = function() {myFunction()};
  var pageHeader = document.getElementById("mainMenu");  
  function myFunction(){
      if(window.pageYOffset >= 100){
          pageHeader.classList.add("sticky");
      } else {
          pageHeader.classList.remove("sticky");
      }
  }
  function sendEmail(data, subject, mailTo, secret ){
    var message="";    
    if (data) { 
      // console.log(data);
      message+="<div>Customer details:</div>";
      $.each(data, function(key,value) {
        message+="<div><p>"+key+":"+value+"</p></div>";
      });           
    }    
    $.ajax({
      beforeSend: function () {          
        jQuery("#loader").show();
      },
      "url": "https://api.sendgrid.com/v3/mail/send",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+secret,
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
          "email": "website@optica.solutions"
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
          console.log(responseData);
        }
      },
      error: function (request, error) {                
        alert("Your message is not sent " + error);
        console.log(error);     
      }
    });      
  }

  // function getSecretKey(){
  //   $.ajax({
  //     beforeSend: function () {          
  //       jQuery("#loader").show();
  //     },
  //     "url": "https://api.digitalocean.com/v2/apps/{id}",
  //     "method": "GET",
  //     "timeout": 0,
  //     "headers": {
  //       "Authorization": "Bearer $DIGITALOCEAN_TOKEN",
  //       "Content-Type": "application/json"
  //     },
  //     "data": '',
  //     success: function (responseData) {
  //       if(responseData!=null){
  //         console.log(response);
  //       }
  //     },
  //     error: function (request, error) {                
  //       alert("Your message is not sent " + error);      
  //     }
  //   });
  // }
});