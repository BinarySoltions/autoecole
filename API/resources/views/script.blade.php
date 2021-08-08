<script>
        function myFunction() {
            var element = document.getElementById("idMenu");
            if (document.body.getBoundingClientRect().top < -20)
                element.classList.add("fixed-menu");
            else
                element.classList.remove("fixed-menu");
        }
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
                    alert(data); // show response from the php script.
                }
            });


        });

        $(document).ready(function() {

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
                    messages: {
                        nom: "Please enter your firstname",
                        lastname: "Please enter your lastname",
                        password: {
                            required: "Please provide a password",
                            minlength: "Your password must be at least 5 characters long"
                        },
                        email: "Please enter a valid email address"
                    }
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
        });

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 10,
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
    el: '.swiper-scrollbar',
  },
        });
    </script>