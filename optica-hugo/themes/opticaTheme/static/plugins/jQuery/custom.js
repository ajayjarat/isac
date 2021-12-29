jQuery(function($) {
  var downloadLink="";
  var baseUrl = window.location.origin;
  var secretKey="";
  var modalId="";
  var optionVal="";
  formID="";
  $('.team-modal').click(function() {
    $('#teamModal').modal('toggle');
    var memberInfo = $(this).attr("data-summary"); 
    var memberTitle = $(this).attr("data-title");             
    $('#teamModal .modal-title').html(memberTitle);
    $('#teamModal .modal-desc').html(memberInfo);    
  });
  $('.request-demo').click(function() { 
    $('#contactModal').modal('toggle');
    optionVal = $(this).attr("data-option");
    secretKey=$(this).attr("data-secret");    
    modalId="contactModal" ;
    $('#contactForm #purpose').val(optionVal).change();
  });    
  $('.download-fact-sheet').click(function() { 
    downloadLink = $(this).attr("data-file"); 
    secretKey=$(this).attr("data-secret-key");         
    $('#downloadFactModal').modal('toggle');
    modalId="downloadFactModal" ;
  });
  $("#download-fact-form").on("submit", function(event){
    event.preventDefault();
    formID= "download-fact-form";      
    var factFormData={};
    factFormData = createFormData('download-fact-form') ;
    // console.log(factFormData);
    if(!($.isEmptyObject(factFormData))){
      sendEmail(factFormData, "Download Product Fact Sheet", "enquiry@optica.solutions", secretKey );
    }
  });
  $("#contactForm").submit(function(event) {               
    event.preventDefault();    
    formID= "contactForm";
    var contactData={}; 
    contactData = createFormData('contactForm') ;
    // console.log(contactData);
    if(!($.isEmptyObject(optionVal))){
      sendEmail(contactData, optionVal, "info@optica.solutions", secretKey );
    }
  });
  $("#homeContactForm").submit(function(event) {          
    event.preventDefault();
    secretKey=$("#homeContactForm #api_key").val();
    var purpose=$("#homeContactForm #yourPurpose").val();
    formID= "homeContactForm";    
    var formData={};
    formData = createFormData('homeContactForm') ;
    // console.log(formData);
    if(!($.isEmptyObject(formData))){
      sendEmail(formData, purpose, "enquiry@optica.solutions", secretKey );
    }
  });
  window.onscroll = function() {addSticky()};
  var pageHeader = document.getElementById("mainMenu");  
  function addSticky(){
    if(window.pageYOffset >= 100){
        pageHeader.classList.add("sticky");
    } else {
        pageHeader.classList.remove("sticky");
    }
  }
  function createFormData(currentFormId){
    var currentFormData={};
    $.each($('#'+currentFormId).serializeArray(), function(i, field) {
      if(field.value==''){
        $("input[name='"+field.name+"']").css('border','1px solid red');
      }else{
        $("input[name='"+field.name+"']").css('border','1px solid green');
        currentFormData[field.name]=field.value;
      }        
    });
    return currentFormData;
  }
  function sendEmail(data, subject, mailTo, secret ){
    // console.log(subject);
    var message="";    
    if (data) { 
      // console.log(data);
      message+="<div><h4>Customer details:</h4></div>";
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
          "email": "info@optica.solutions"
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
        alert("Email Send Successfully");                
        if(modalId=="downloadFactModal"){
          jQuery('#downloadFactModal .modal-body .download-fact-form').css({"display":"none"});
          jQuery("#downloadFactModal .modal-body").html("<div class='text-center'><h5>Your downloadable link is enabled</h5><a class='text-center' href="+downloadLink+" target='_blank'>Download fact sheet</a></div>");          
        }else{
          $("#"+modalId).modal('toggle');
        }
        $("#"+formID).trigger("reset");        
      },
      error: function (request, error) {                
        alert("Your message is not sent " + error);
        console.log(error);
        // $("#"+formID).trigger("reset");
        // $("#"+modalId).modal('toggle');    
      }
    });      
  }
});