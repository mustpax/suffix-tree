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

        Node.prototype.toElement = function() {
            var ret = $('<ul>');
            _.each(this.edges, function(v, k) {
                ret.append($('<li>').append($('<span>').text(k))
                                    .append(v.toElement()));
            });
            return ret;
        }

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
        $('#output').html(gen_suffix_tree($('#input').val()).toElement());
    }

    $('form').submit(function() {
        update();
        return false;
    });

    $(update);
})(jQuery, _);
