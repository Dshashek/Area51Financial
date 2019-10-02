// With JQuery
//for sliders
$(document).ready(function() {
    $.ajax({
        url: '/age',
        type: 'POST',
        success: function(response) {
            var temp = JSON.parse(response);
            $('#age').append('<option></option>');
            $.each(temp, function(i, val) {
                $('#age').append('<option value=' + val + '>' + val + '</option>')

            });

        }
    })


    $('.js-example-basic-single').select2({
        placeholder: "Age",
        allowClear: true
    });

    $("#ex8").slider({

    });

    $("#ex9").slider({

    });

    $("#ex10").slider({

    });

    $("#ex11").slider({

    });



    //for filters
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });





        })