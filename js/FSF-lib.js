(function (win, iScroll) {

    var _fontList = [16, 15, 14, 13, 12];
    var _scrollHeight = 0;
    var _doc = win.document;
    var iScroll = iScroll;
    var _nInterval = undefined;
    var _win = win;


    var FALib = function (wrapper, conf) {

        this.scroll = undefined;
        this.isScrollHeight = false;
        this.scrollWrapper = _doc.querySelector(wrapper);

        this.config = {
            maxScrollheight: conf.maxScrollheight,
            fontCalibration: conf.fontCalibration
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
        var isipad = /iPad/i.test(ua);

        if (isipad) {
            return true;
        } else {
            return false;
        }
    }


    FALib.prototype.applyScroll = function () {
        if (this.detectuserAgent()) {
            this.scroll = new iScroll(this.scrollWrapper, { mouseWheel: true, scrollbars: true, click: true });
            refreshScroll.call(this);
        } else {
            this.scrollWrapper.classList.add("FCalibrater-overflow");
        }
    }
    FALib.prototype.onUpdate = function () {

        var currHeight = _scrollHeight = this.scrollWrapper.children[0].scrollHeight;
        console.log(this.scrollWrapper.children[0].scrollHeight);
        console.log(this.scrollWrapper.children[0]);

        this.isScrollHeight = (parseInt(currHeight) <= parseInt(this.config.maxScrollheight)) ? true : false;
    }

    FALib.prototype.reduceFontSize = function () {
        var _self = this;
        var reduceBy = 0;

        if (this.config.fontCalibration === true) {
            _nInterval = setInterval(function () {
                if ((_self.isScrollHeight) || (reduceBy >= _fontList.length)) {
                    reduceBy = 0;
                    showResizedContent.call(_self);
                    clearInterval(_nInterval);
                } else {
                    var elem = _self.scrollWrapper.children[0];
                    elem.style.fontSize = _fontList[reduceBy] + "px";
                    _self.onUpdate();
                    reduceBy++;
                }
            }, 20);
        }
        this.applyScroll();
    }

    FALib.prototype.getScrollHeight = function () {
        return _scrollHeight;
    }

    FALib.prototype.destroy = function () {
        delete this.scroll;
        this.scroll = null;

        _scrollHeight = 0;        
        _nInterval = undefined;        
        this.config = undefined;
        this.scroll = undefined;
        this.isScrollHeight = false;
        this.scrollWrapper = undefined;
    }

    function refreshScroll() {
        var _Self = this;
        setTimeout(function () {
            _Self.scroll.refresh();
        }, 200);
    }
    function showResizedContent() {
        this.scrollWrapper.children[0].style.visibility = "visible";
    }
    _win.FALib = FALib;

})(window, IScroll)







/**------Demo code-------------*/
// var scroller = new FALib("#FCalibrater", { "maxScrollheight": 200,"noFontReduction":false });
// scroller.reduceFontSize().destroy();