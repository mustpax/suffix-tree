(function($, _) {
    "use strict";

    var Node = (function() {
        function Node() {
            this.edges = {};
        }

        Node.prototype.addStr = function(str) {
            if (! str) {
                return;
            }

            var cur = str[0];
            if (! this.edges[cur]) {
                this.edges[cur] = new Node();
            }

            this.edges[cur].addStr(str.slice(1));
        };

        Node.prototype.toString = function() {
            var ret = [];

            _.each(this.edges, function(v, k) {
                ret.push('[' + k + ',' + v + ']');
            });

            return ret.join('');
        };

        return Node;
    })();


    function gen_suffix_tree(str) {
        if (! str) {
            return null;
        }

        var ret = new Node();
        var substr = '';
        for (var i = (str.length - 1); i >= 0; i--) {
            substr = str[i] + substr;
            ret.addStr(substr);
        }

        console.log('tree', ret);
        return ret;
    }

    function update() {
        $('#output').text(gen_suffix_tree($('#input').val()));
    }

    $('form').submit(function() {
        update();
        return false;
    });

    $(update);
})(jQuery, _);
