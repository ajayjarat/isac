jQuery(function($) {
  var downloadLink="";
  var baseUrl = window.location.origin;
  var secretKey="";
  var modalId="";
  var optionVal="";
  var nameIsvalid =false;
  var emailIsvalid =false;
  var phoneIsvalid =false;
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
  function validateName(name){
    var nameVal = $("input[name='"+name+"']").val();
    if(nameVal.trim()=== ''){ 
      $("input[name='"+name+"']").css('border','1px solid red');
      nameIsvalid=false;
      return false;
    }else{
      $("input[name='"+name+"']").css('border','1px solid green');      
      nameIsvalid=true;
      return true;
    }
  }  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function validEmail(fieldName){
    var email = $("input[name='"+fieldName+"']").val();
    if(email.trim()=== ''){          
      $("input[name='"+fieldName+"']").css('border','1px solid red');
      emailIsvalid=false;
      return false;
    }else{
      if(validateEmail(email)){
        $("input[name='"+fieldName+"']").css('border','1px solid green');        
        emailIsvalid=true;
        return true;
      }else{      
        $("input[name='"+fieldName+"']").css('border','1px solid red');        
        emailIsvalid=false;
        return false;
      }
    }
  }
  function validatePhone(phone){
    var phoneVal = $("input[name='"+phone+"']").val();
    if(phoneVal.trim()=== ''){
      $("input[name='"+phone+"']").css('border','1px solid red');      
      phoneIsvalid=false;
      return false;
    }else{      
      var val = $("input[name='"+phone+"']").val();      
      var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      if(filter.test(val)){  
        $("input[name='"+phone+"']").css('border','1px solid green');              
        phoneIsvalid=true;
        return true;
      }else{        
        $("input[name='"+phone+"']").css('border','1px solid red');        
        phoneIsvalid=false;
        alert("Enter 10 digit valid phone number");
        return false;
      }
    }
  }
  $("#download-fact-form").on("submit", function(event){
    event.preventDefault();
    validateName("personName");
    validEmail('personEmail');    
    formID= "download-fact-form";      
    var factFormData={};    
    if(nameIsvalid==true && emailIsvalid==true){
      factFormData = createFormData('download-fact-form') ;
    }else{
      alert("Please enter data to all fields.");
    }
    if(!($.isEmptyObject(factFormData))){
      sendEmail(factFormData, "Download Product Fact Sheet", "enquiry@optica.solutions", secretKey );
    }
  });
  
  $("#contactForm").submit(function(event) {               
    event.preventDefault();
    validateName("customerName");
    validEmail('customerEmail');
    validatePhone('contact');   
    formID= "contactForm";
    var contactData={};    
    if(phoneIsvalid==true && nameIsvalid==true && emailIsvalid==true){
      contactData = createFormData('contactForm');
    }else{
      alert("Please enter data to all fields.");
    } 
    if(!($.isEmptyObject(contactData))){
      sendEmail(contactData, optionVal, "info@optica.solutions", secretKey );
    }
  });
  $("#homeContactForm").submit(function(event) {          
    event.preventDefault();
    validateName("client_name");
    validEmail('email_id');
    validatePhone('phone_no');
    secretKey=$("#homeContactForm #api_key").html();    
    var purpose=$("#homeContactForm #yourPurpose").val();
    formID= "homeContactForm";    
    var formData={};
    if(phoneIsvalid==true && nameIsvalid==true && emailIsvalid==true){
      formData = createFormData('homeContactForm');
    }else{
      alert("Please enter data to all fields.");
    }        
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
      currentFormData[field.name]=field.value; 
    });
    return currentFormData;     
  }
  function sendEmail(data, subject, mailTo, secret ){   
    var message="";    
    if (data) {       
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