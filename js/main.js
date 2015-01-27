$(function() {
    // $('#dl-menu').dlmenu();
    $(".fancybox").fancybox();

    // form
    $("form button").click(function(e) {

    	e.preventDefault();

        var proceed = true;

        // //simple validation at client's end
        // //loop through each field and we simply change border color to red for invalid fields
        // $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
        //     $(this).css('border-color','');
        //     if(!$.trim($(this).val())){ //if this field is empty
        //         $(this).css('border-color','red'); //change border color to red
        //         proceed = false; //set do not proceed flag
        //     }
        //     //check invalid email
        //     var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        //     if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
        //         $(this).css('border-color','red'); //change border color to red
        //         proceed = false; //set do not proceed flag
        //     }
        // });

        if(proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'name'     : $('input[name=name]').val(),
                'email'    : $('input[name=email]').val(),
                'phone'  : $('input[name=phone]').val(),
                'message'           : $('textarea[name=message]').val()
            };

            // console.log('data:', post_data);

            //Ajax post data to server
            $.post('form.php', post_data, function(response){
                if(response.type == 'error'){ //load json data from server and output message
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    // $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
                    // $("#contact_form #contact_body").slideUp(); //hide form after success
                    $('input').val('');
                	$('textarea').val('');
                }
                $(".errors").hide().html(output).slideDown();
            }, 'json');
        }
    });

});