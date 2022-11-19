<script>
     var called = false;  
    
    function toggleDesc() {
        if(!called){
        $(".complete").toggle();
        $(".more").click(function() {
           
            if ($(this).text().localeCompare("Voir moins..") == 0) {
                $(this).text("Voir plus..").siblings(".complete").toggle();
                $(this).siblings(".notAll").toggle();

            } else {
                $(this).text("Voir moins..").siblings(".complete").toggle();
                $(this).siblings(".notAll").toggle();
                
        }
        });
        called = true;
    }
    }
    function getMessage(group, div, nbr) {
        $.ajax({
            type: 'POST',
            url: '/api/getFilesWebGroup',
            data: JSON.stringify({
                'group': group,
                'nbr': nbr
            }),
            dataType: 'html',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                div.html(data);
                toggleDesc();
            }
        });
    }
    $(document).ready(function() {

        getMessage("Groupe", $("#grpImage"), 2);
        getMessage("Flyers", $("#grpFlyers"), 2);
        getMessage("FlyersTarif", $("#grpFlyersTarif"), 1);
        getMessage("FlyersPerfectionnement", $("#grpFlyersPerfectionnement"), 1);
        // this is the id of the form
        $("#formContact").submit(function(e) {

            e.preventDefault(); // avoid to execute the actual submit of the form.
            var form = $(this);
            if (!form.valid()) {
                return;
            }
            var url = form.data('action');

            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form's elements.
                success: function(data) {
                    $('.toast').toast({
                        delay: 10000
                    });
                    $('.toast').toast('show');
                    $('.toast').css('z-index', 3);
                }
            });


        });



        var validate = $("#formContact").validate({ // initialize the plugin
            rules: {
                nom: {
                    required: true,
                    maxlength: 100
                },
                email: {
                    required: true,
                    email: true,
                    maxlength: 50
                },
                telephone: {
                    required: true,
                    maxlength: 10
                },
                message: {
                    required: true,
                    maxlength: 50
                },
                messages: {}
            }
        });

        $.extend($.validator.messages, {
            required: "Le champ est obligatoire.",
            remote: "Please fix this field.",
            email: "L'adresse email n'est pas valide.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Le nombre de caractères maximal est de {0}."),
            minlength: jQuery.validator.format("Le nombre de caractères minimal est de {0}."),
            rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
            range: jQuery.validator.format("Please enter a value between {0} and {1}."),
            max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
            min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
        });


        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });

    });
</script>