(function($, _) {
    "use strict";
    function gen_suffix_tree(str) {
        return str;
    }

    function update() {
        $('#output').text(gen_suffix_tree($('#input').val()));
    }

    $('form').submit(function() {
        update();
        return false;
    });

    $(update);
})(jQuery, _)
