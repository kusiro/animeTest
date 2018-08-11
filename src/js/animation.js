import anime from 'animejs';
// import bezier from './bezier.js'



// -----------------timeline way------------------------

var scaleY = $('.title').height();

var titleAnime = anime.timeline();
var infoAnime = anime.timeline({
    delay: 2500,
});
var headAnime = anime.timeline({
    easing: [0.8, 0, 0.2, 1],
});

titleAnime
    // .add({
    //     targets: '.bord',
    //     borderWidth: [0, 200],
    //     width: [0, 400],
    //     height: [0, 400],
    //     easing: [0.8, 0, 0.2, 1],
    //     duration: 700
    // })
    // .add({
    //     targets: '.bord',
    //     borderWidth: 0,
    //     easing: [0.5, 0, 0.1, 1],
    //     duration: 700,
    //     offset: 600
    // })
    .add({
        targets: '.mask',
        delay: function(el, i) { return i * 600 + 200 },
        duration: 500,
        easing: [0.1, 0, 0.2, 1],
        loop: false,
        translateY: [
            { value: [scaleY, 0]},
            { value: [0, scaleY*(-1)]}
        ],
        offset: 700
    })
    .add({
        targets: 'h2',
        delay: function(el, i) { return i * 600},
        duration: 1000,
        opacity: [0, 1],
        translateY: [0, -12],
        easing: [0.1, 0, 0.2, 1],
        loop: false,
        offset: 900
    })
    .add({
        targets: '.line_contain',
        opacity: [0, 1],
        width: [250, 200],
        duration: 1000,
        easing: [0.1, 0, 0.2, 1],
        offset: 2300
    })

infoAnime
    .add({
        targets: 'hr',
        scaleX: [0, 1],
        duration: 700,
        easing: [0.8, 0, 0.2, 1]
    })
    .add({
        targets: '.content',
        opacity: [0, 1],
        translateX: [15, 0],
        duration: 700,
        delay: function(el, i) { return i * 300 },
        easing: [0.8, 0, 0.2, 1]

    })

headAnime
    .add({
        targets: '.imgBorder',
        scale: [0,1],
        delay: function(el, i) { return i * 100 },
        duration: 1200,
        offset: 3500
    })
    .add({
        targets: '.imgBorder',
        delay: function(el, i) { return i * 100 },
        borderWidth: 1,
        duration: 1200,
        offset: 3900
    })
    .add({
        targets: '.nickname',
        delay: function(el, i) { return i * 100 },
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 1200,
        offset: 3900
    })
// -----------------normal way------------------------

// var playpauseAni = anime({
//     targets: '.mask',
//     translateY: [
//         { value: [40, 0], duration: 500, delay: 500},
//         { value: [0, -40], duration: 500, delay: 0}
//     ],
//     loop: false,
//     easing: [0.8, 0, 0.2, 1]
// });
// var text = anime({
//     targets: 'h2',
//     opacity: [{value: [0, 1], duration: 1000, delay: 1300}],
//     translateY: [{value: [-5, -16], duration: 1000, delay: 1300}],
//     easing: [0.1, 0, 0.2, 1],
//     loop: false
// });
