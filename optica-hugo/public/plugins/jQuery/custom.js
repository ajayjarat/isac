jQuery(function($) {
  var downloadLink="";
  var baseUrl = window.location.origin;
  var modalId="";
  var puroseOptionVal="";
  var clientName="";
  var validName =false;
  var validEmail =false;
  var validPhone =false;

  formID="";
  // Display team modal and Render data in team modal
  $('.team-modal').click(function() {
    $('#teamModal').modal('toggle');
    var department = $(this).attr("data-department");
    var memberImage = $(this).attr("data-image");
    var image="<img src='/"+memberImage+"' class='img-fluid'> ";
    var memberTitle = $(this).attr("data-title");
    var designation = $(this).attr("data-designation");
    var summary = $(this).attr("data-summary");         
    $('#teamModal .modal-header .title').html(department);
    $('#teamModal .modal-image').html(image);
    $('#teamModal .member-name').html(memberTitle);
    $('#teamModal .designation').html(designation);   
    $('#teamModal .modal-desc').html(summary);    
  });

  //Display and render data in contact modal
  $('.request-demo').click(function() { 
    $('#contactModal').modal('toggle');
    puroseOptionVal = $(this).attr("data-option");
    modalId="contactModal" ;
    $('#contactForm #purpose').val(puroseOptionVal).change();
  }); 

  //Display and render data in download fact modal
  $('.download-fact-sheet').click(function() { 
    downloadLink = $(this).attr("data-file"); 
    $('#downloadFactModal').modal('toggle');
    modalId="downloadFactModal" ;
  });

  //Validation for name field in the form 
  function validateName(name){
    var nameVal = $("input[name='"+name+"']").val();
    if(nameVal.trim()=== ''){ 
      $("input[name='"+name+"']").css('border','1px solid red');
      validName=false;
      return false;
    }else{      
      clientName=nameVal;
      $("input[name='"+name+"']").css('border','1px solid #cbc9c9');      
      validName=true;
      return true;
      
    }
  }  

  //Validation for email field in the form
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function validateEmailField(fieldName){
    var email = $("input[name='"+fieldName+"']").val();
    if(email.trim()=== ''){          
      $("input[name='"+fieldName+"']").css('border','1px solid red');
      validEmail=false;
      return false;
    }else{
      if(validateEmail(email)){
        $("input[name='"+fieldName+"']").css('border','1px solid #cbc9c9');               
        validEmail=true;
        return true;
      }else{      
        $("input[name='"+fieldName+"']").css('border','1px solid red');        
        validEmail=false;
        return false;
      }
    }
  }

  //Validation for phone no field in the form
  function validatePhone(phone){
    var phoneVal = $("input[name='"+phone+"']").val();
    if(phoneVal.trim()=== ''){
      $("input[name='"+phone+"']").css('border','1px solid red');      
      validPhone=false;
      return false;
    }else{      
      var val = $("input[name='"+phone+"']").val();      
      var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      if(filter.test(val)){ 
        $("input[name='"+phone+"']").css('border','1px solid #cbc9c9');                     
        validPhone=true;
        return true;
      }else{        
        $("input[name='"+phone+"']").css('border','1px solid red');        
        validPhone=false;
        return false;
      }
    }
  }
  //Submit download fact form and call send email function
  $("#downloadFactForm").on("submit", function(event){
    event.preventDefault();
    validateName("Person Name");
    validateEmailField('Person Email');    
    formID= "downloadFactForm";      
    var factFormData={};    
    if(validName==true && validEmail==true){
      factFormData = createFormData('downloadFactForm') ;
    }else if(validName==false && validEmail==true){
      alert("Enter valid name");
    }else if(validName==true && validEmail==false){
      alert("Enter valid email");
    }else{
      alert("Enter data to all fields");
    }
    if(!($.isEmptyObject(factFormData)) && clientName!=''){
      sendEmail(clientName, factFormData, "Download Product Fact Sheet", "enquiry@optica.solutions");
    }
  });
  
  //Submit contact form and call send email function
  $("#contactForm").submit(function(event) {               
    event.preventDefault();
    validateName("Customer Name");
    validateEmailField('Customer Email');
    validatePhone('Contact');   
    formID= "contactForm";
    var contactData={};    
    if(validPhone==true && validName==true && validEmail==true){
      contactData = createFormData('contactForm');
    }else{ 
      alert("Enter data to all fields");
    }
    if(!($.isEmptyObject(contactData)) && clientName!=''){
      sendEmail(clientName, contactData, puroseOptionVal, "info@optica.solutions" );
    }
  });

  //Submit home page contact form and call send email function
  $("#homeContactForm").submit(function(event) {          
    event.preventDefault();
    validateName("Client Name");
    validateEmailField('Email');
    validatePhone('Phone No');
    var purpose=$("#homeContactForm #yourPurpose").val();
    formID= "homeContactForm";
    modalId="";    
    var formData={};
    if(validPhone==true && validName==true && validEmail==true && purpose !='' && clientName!=''){
      formData = createFormData('homeContactForm');
    }else{ 
      alert("Enter data to all fields");
    }      
    if(!($.isEmptyObject(formData))){
      sendEmail(clientName, formData, purpose, "enquiry@optica.solutions" );
    }
  });

  //Call addsticky function
  window.onscroll = function() {addSticky()};
  var pageHeader = document.getElementById("navHeader"); 
  //Add sticky header on page scroll
  function addSticky(){
    if(window.pageYOffset >= 100){
        pageHeader.classList.add("sticky");
    } else {
        pageHeader.classList.remove("sticky");
    }
  }
  //Get form data 
  function createFormData(currentFormId){
    var currentFormData={};    
    $.each($('#'+currentFormId).serializeArray(), function(i, field) {
      currentFormData[field.name]=field.value; 
    });
    return currentFormData;     
  }

  //Call php script to send email 
  function sendEmail(name, data, subject, mailTo ){
    var message="";      
    if (data) {       
      // message+="<div><h4>Customer Details:</h4></div>";
      $.each(data, function(key,value) {
        message+="<div><p>"+key+": "+value+"</p></div>";
      });           
    }
    var actionurl = "https://isac-api-dx4bj.ondigitalocean.app/email.php";    
    $.ajax({
      url: actionurl,
      type: 'post',
      data: {
        data:message,
        subject: subject,
        mailto:mailTo,
        name:name
      },    
      success: function(response){        
        if(response.status==202){
          console.log(modalId);
          if(modalId=="downloadFactModal"){
            jQuery('#downloadFactModal .modal-body .downloadFactForm').css({"display":"none"});
            jQuery("#downloadFactModal .modal-body").html("<div class='text-center'><h5>Your downloadable link is enabled</h5><a id='downloadLinkId' class='text-center' href="+downloadLink+" target='_blank'>Download fact sheet</a></div>");          
          }else{
            alert(response.message);
            if(modalId=="contactModal"){
              $("#"+modalId).modal('toggle');
            }
          }
          $("#"+formID).trigger("reset");
        }else{
          alert("Your message is not sent")
        }             
      },
      error: function (request, error) {                
        alert("Your message is not sent " + error);      
      }         
    });
  }
});