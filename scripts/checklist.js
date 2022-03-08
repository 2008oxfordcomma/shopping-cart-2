(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function(func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    CheckList.prototype.addRow = function (storeOrder) {
        var rowElement = new Row(storeOrder);
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
        .find('[value="' + email + '"]')
        .closest('[data-store-order="checkbox"]')
        .remove();
    };

    function Row(storeOrder) {
        let $div = $('<div></div>', {
            'data-store-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: storeOrder.emailAddress
        });

        let description = '  Order: ';

        if (storeOrder.image1) {
            description += storeOrder.image1 + '; ';
        }

        if (storeOrder.image2) {
            description += storeOrder.image2 + '; ';
        }

        if (storeOrder.image3) {
            description += storeOrder.image3 + '; ';
        }

        if (storeOrder.image4) {
            description += storeOrder.image4 + '; ';
        }

        if (storeOrder.image5) {
            description += storeOrder.image5 + '; ';
        }

        if (storeOrder.image6) {
            description += storeOrder.image6 + '; ';
        }

        if (storeOrder.image7) {
            description += storeOrder.image7 + '; ';
        }

        if (storeOrder.image8) {
            description += storeOrder.image8 + '; ';
        }

        if (storeOrder.image9) {
            description += storeOrder.image9 + '; ';
        }

        if (storeOrder.image10) {
            description += storeOrder.image10 + '; ';
        }

        if (storeOrder.image11) {
            description += storeOrder.image11 + '; ';
        }

        if (storeOrder.image12) {
            description += storeOrder.image12 + '; ';
        }

        description += ' (' + storeOrder.emailAddress + ')';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);