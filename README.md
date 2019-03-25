# iScroll
iScroll_lib

#iScroll Wrapper

This is an wrapper to the iScroll library, which helps in maintaining the font-size with respect to the scroll height of the container.

#How to use

1. Instantiate the library by passing the scroll wrapper ID to the call 'new'
    Example: 

    var scroller = new FSF.constructor("#scrollWrapper", { "maxScrollheight": 173 });
        scroller.reduceFontSize();
        
2. delete the scroller instance by calling
    scroller.remove();        
