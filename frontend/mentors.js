(function () {
    var root  = document.getElementById('sponsors');
    if (!root) return;
    var car   = root.querySelector('.ps__carousel');
    var track = root.querySelector('.ps__track');
    var cards = track.querySelectorAll('.ps__card');
    var prev  = root.querySelector('.ps__arrow--prev');
    var next  = root.querySelector('.ps__arrow--next');
    var index = 0;
    var timer = null;
    var DELAY = 2500;  

    function visible()  { return parseInt(getComputedStyle(car).getPropertyValue('--n'), 10) || 4; }
    function gap()      { return parseFloat(getComputedStyle(track).columnGap) || 0; }
    function maxIndex() { return Math.max(0, cards.length - visible()); }

    function update() {
        index = Math.min(Math.max(index, 0), maxIndex());
        var step = cards[0].offsetWidth + gap();
        track.style.transform = 'translateX(' + (-index * step) + 'px)';
    }

    function stopAuto() {
        clearInterval(timer);
        timer = null;
    }

  
    function autoplay() {
        timer = setInterval(function () {
            if (index >= maxIndex()) {
                index = 0;
                update();
                stopAuto();
            } else {
                index++;
                update();
            }
        }, DELAY);
    }

    prev.addEventListener('click', function () {
        stopAuto();
        index = index <= 0 ? maxIndex() : index - 1;
        update();
    });
    next.addEventListener('click', function () {
        stopAuto();
        index = index >= maxIndex() ? 0 : index + 1;
        update();
    });

    window.addEventListener('resize', update);
    update();
    autoplay();
})();
