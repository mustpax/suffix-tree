(function($, _) {
    "use strict";

    var Node = (function() {
        function Node(_parent, letter) {
            this.edges = {};
            this.isTerminal = false;
            this._parent = _parent;
            this.letter = letter;
        }

        Node.prototype.addStr = function(str) {
            if (! str) {
                this.isTerminal = true;
                return;
            }

            var cur = str[0];
            if (! this.edges[cur]) {
                this.edges[cur] = new Node(this, cur);
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

            if (this.isTerminal) {
                ret.append($('<li>$</li>'));
            }

            _.each(this.edges, function(v, k) {
                ret.append($('<li>').append($('<span>').text(k))
                                    .append(v.toElement()));
            });
            return ret;
        };

        Node.prototype.isLeaf = function() {
            if (this.isTerminal) {
                return _.isEmpty(this.edges);
            } else {
                return _.size(this.edges) === 1;
            }
        };

        Node.prototype.compact = function() {
            _.each(this.edges, function(v, k) {
                v.compact();
            });

            if (this.isLeaf()) {
                _.each(this.edges, function(v, k) {
                    if (this._parent) {
                        delete this._parent.edges[this.letter];
                        this._parent.edges[this.letter + k] = v;
                    }
                }, this);
            }
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
        var tree = gen_suffix_tree($('#input').val());
        $('#output').empty()
                    .append(tree.toElement());
        tree.compact();
        $('#output').append($('<h1>Compact</h1>'));
        $('#output').append(tree.toElement());
    }

    $('form').submit(function() {
        update();
        return false;
    });

    $(update);
})(jQuery, _);
