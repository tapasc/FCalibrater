(function (win, iScroll) {

    var _fontList = [16, 15, 14, 13, 12];
    var _scrollHeight = 0;
    var _doc = win.document;
    var iScroll = iScroll;
    var _nInterval = undefined;
    var _win = win;


    var FALib = function (wrapper, conf) {

        this.isipad = undefined;
        this.scroll = undefined;
        this.isScrollHeight = false;
        this.scrollWrapper = _doc.querySelector(wrapper);

        this.config = {
            maxScrollheight: conf.maxScrollheight
        };

        this.init();
    }


    FALib.prototype.init = function () {
        this.detectuserAgent();

        if (typeof this.scrollWrapper != "undefined") {
            _scrollHeight = this.scrollWrapper.children[0].scrollHeight;
            this.onUpdate();
        } else {
            console.warning('wrapper element is not defined!');
        }

    }

    FALib.prototype.detectuserAgent = function () {
        var ua = navigator.userAgent;
        this.isipad = /iPad/i.test(ua);
    }


    FALib.prototype.applyScroll = function () {
        var _self = this;
        if (this.isipad) {
            this.scroll = new iScroll(this.scrollWrapper, { mouseWheel: true, scrollbars: true });
            resetScrollPos.call(this);
        } else {
            this.scrollWrapper.classList.add("FCalibrater-overflow");
        }
    }
    FALib.prototype.onUpdate = function () {

        var currHeight = _scrollHeight = this.scrollWrapper.children[0].scrollHeight;
        this.isScrollHeight = (parseInt(currHeight) <= parseInt(this.config.maxScrollheight)) ? true : false;
    }

    FALib.prototype.reduceFontSize = function () {

        var _self = this;

        var reduceBy = 0;
        _nInterval = setInterval(function () {

            if ((_self.isScrollHeight) || (reduceBy >= _fontList.length)) {
                reduceBy = 0;
                clearInterval(_nInterval);
            } else {                
                var elem = _self.scrollWrapper.children[0];
                elem.style.fontSize = _fontList[reduceBy] + "px";
                _self.onUpdate();
                reduceBy++;

            }
        }, 2);

        this.applyScroll();
        return this;
    }

    FALib.prototype.getScrollHeight = function () {
        return _scrollHeight;
    }

    FALib.prototype.destroy = function () {
        delete this.scroll;
        this.scroll = null;
    }

    function resetScrollPos() {
        var _Self = this;
        setTimeout(function () {
            _Self.scroll.refresh();
        }, 500);
    }

    _win.FALib = FALib;

})(window, IScroll)








var scroller = new FALib("#FCalibrater", { "maxScrollheight": 200 });
scroller.reduceFontSize().destroy();