$(function(){
    // header ===================================================================
    // 공통 변수 모음 ------------------------------------------------
    // 반응형 조건
    const min1024 = window.matchMedia("(min-width: 1024px)");
    const max1023 = window.matchMedia("(max-width: 1023px)");
    // 메뉴버튼 중복 클릭 체크
    let clicked = 0;


    // header default setting --------------------------------------
    // 초기 설정
    function setHeaderState() {
        if (min1024.matches) {
                $('.header').removeClass('fix on');
        } else if (max1023.matches) {
            $('.header').removeClass('ani').addClass('fix on');
        }
    };

    // 페이지 로딩 시와 브라우저 크기 변경 시 초기 설정 적용
    $(document).ready(function() {
        setHeaderState();
    
    });

    $(window).resize(function() {
        setHeaderState();
      

    });

    // btn.menu - sub menu open
    // sub menu gsap animation timeline
    let hdmenu = gsap.timeline({paused: true});
        hdmenu.fromTo(".menu-area", {y: "100%", autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.inOut"});
        hdmenu.fromTo(".hdest1023-item", {y: "100%", autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.2, ease: "power2.inOut"});
        hdmenu.fromTo(".menu-item", {y: "100%", autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.2, ease: "power2.inOut"});
        hdmenu.fromTo(".lang1023-item", {y: "100%", autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.2, ease: "power2.inOut"});

    // 메뉴 조건 체크 변수
    let menuClose = true;

    // 재사용을 위한 함수
    function menu1023(){
        // header position fixed 체크
        let headerFix = $('.header').hasClass('fix');
        $(this).toggleClass('on');
       
        if (menuClose) {
            // 스크롤 바 사라짐
            $('body').addClass('no-scroll');
            $('.header').addClass('on');

            // 메뉴가 닫혀있을 때  열기
            hdmenu.play();
            $('.header .menu-area').css('display','block');
            menuClose = false;

            let clickedTarget = $(this);
            let otherElements = $('.btn.hdest, .btn.menu, .btn.mark').not(clickedTarget);

            // 클릭한 요소와 다른 버튼이 모두 클래스명 on을 가지고 있다면 메뉴 중복 클릭 증가
            if (otherElements.hasClass('on') && clickedTarget.hasClass('on')) {
                clicked++;
            }

        } else {
            // 스크롤 바 다시 나타남
            $('body').removeClass('no-scroll');
           
            // 메뉴가 열려있을 때  닫기
            hdmenu.reverse().eventCallback("onReverseComplete", function() {
                // hdmenu.reverse() 실행된 후에 실행
                $('.header .menu-area').css('display','none');
    
                if (!headerFix && clicked === 0) {
                    $('.header').removeClass('on');
                } else {
                    clicked--;
                }
            });
            menuClose = true;
        }
        }


    // header scroll ----------------------------------------------
    // 이전 스크롤 값 초기화
    let prevScroll = $(window).scrollTop(); 

    $(window).scroll(function(){
        // 현재 스크롤 값
        let currentScroll = $(window).scrollTop(); 

        // header fixed, ani 컨트롤
        if (currentScroll < prevScroll) {
            if (min1024.matches) {
                // 스크롤이 올라가면 fixed 추가, header 내려감
                $('.header').removeClass('ani').addClass('fix on');
            };

        } else {
            if (max1023.matches) {
                $('.header').removeClass('ani').addClass('fix on');
            };

            if (min1024.matches) {
                // 스크롤이 내려가면 fixed 삭제, header 올라감
                $('.header').removeClass('fix').addClass('ani');
            };
        };

        // 이전 스크롤 값을 현재 스크롤 값으로 업데이트
        prevScroll = currentScroll;

        // 스크롤 값이 0 이하면 기본 header 스타일로 변경
        if (currentScroll <= 0) {
            if (min1024.matches) {
                $('.header').removeClass('fix on');
            };
        } else {
            return false;
        };
    });

    // max1023에서 스크롤 160이상 bg color 변경
    $(window).scroll(function(){
        let maxScroll = $(this).scrollTop();
        if (max1023.matches && maxScroll >= 0 && maxScroll < 160) {
            $('.header').css('background', 'transparent');
        } else {
            // 스크롤 값 160 미만 시 배경색 투명으로 변경
            $('.header').css('background', '#000'); 
        }
    });
    


    // btn.dest click ---------------------------------------------
    $('.btn.hdest').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('on');
        if(max1023.matches) {
            // 통합된 hdest, lang sub menu on
            if ($('.btn.hdest').hasClass('on'))  {
                setTimeout(function(){
                    $('.header .menu-area').removeClass('max1023');
                }, 5000)
            } else {
                $('.header .menu-area').addClass('max1023');
            }

            menu1023.call(this);
        };

        if(min1024.matches) {
            let headerFix = $('.header').hasClass('fix');
            // header logo, border animation
            $('.hdest-box').fadeToggle(500);
            
            //header fixed인 경우 on유지
            if($('.header').hasClass('fix')) {
                $('.header').addClass('on');
            }
            
            // 창이 열리면 스크롤 사라짐
            if ($(this).hasClass('on')) {
                $('body').addClass('no-scroll');
                $('.header').addClass('on');
                let clickedTarget = $(this); 
                let otherElements = $('.btn.hdest, .btn.menu, .btn.mark').not(clickedTarget);
                // 클릭한 요소와 다른 버튼이 모두 클래스명 on을 가지고 있다면 메뉴 중복 클릭 증가
                if (otherElements.hasClass('on') && clickedTarget.hasClass('on')) {
                    clicked++;
                } 
            
            } else {
                $('body').removeClass('no-scroll');
                // 메뉴가 마지막 1개가 남았다면 header on 삭제
                if (!headerFix && clicked === 0) {
                    $('.header').removeClass('on');
                } else {
                    // 메뉴가 마지막 1개가 아니었다면 메뉴 중복 클릭 증감
                    clicked--;
                }
            }
        }
    })

    // hdest 밖의 요소를 클릭했을 때  close
    $(document).mouseup(function (e){
        e.stopPropagation();
            let headerFix = $('.header').hasClass('fix');
            let headerEl = !$('.btn.hdest, .btn.menu, .btn.mark').is(e.target);
            let onlyHeader = $('.btn.hdest').hasClass('on');

            // header가 fixed가 아닐 때
            if (headerEl && onlyHeader && !headerFix) {
                $('body').removeClass('no-scroll');
                $('.btn.hdest').removeClass('on');
                $('.hdest-box').fadeOut(500);

                // 메뉴 중복 체크 0이면 header class on 제거
                if (clicked === 0) {
                    $('.header').removeClass('on');
                } else {
                    // 메뉴 중복 체크 0아니면 값 증감
                    clicked--;
                }

            // header가 fixed일 때    
            } else if(headerEl && onlyHeader && headerFix) {
                $('.header').addClass('on');
                $('.btn.hdest').removeClass('on');
                $('.hdest-box').fadeOut(500);
            } else {
                return false;
            }
      });

    

    $('.lang1023-item').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
    })

    // btn.lang click
    $('.btn.lang').click(function(e){
        // 클릭 이벤트 캡쳐링 방지
        e.stopPropagation();
        $(this).toggleClass('on');
        $('.lang-box').slideToggle(100);
    })

    

    // btn.menu click
    $('.btn.menu').click(function(e){
        // 클릭 이벤트 캡쳐링 방지
        e.stopPropagation()
        $('.hamburger-group').toggleClass('on');

        menu1023.call(this);
    });
    
    // btn.mark - sub menu open
    // book-area animation timeline
    let bookmenu = gsap.timeline({paused: true});
        bookmenu.fromTo(".book-area", {x: "100%", autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.inOut"});

    let bookBtn = true;

    // btn.mark click
    $('.btn.mark, .book-area .close').click(function(e){
        // 클릭 이벤트 캡쳐링 방지
        e.stopPropagation()
        $('.book-area').toggleClass('on');
        if(min1024.matches) {
            $(this).toggleClass('on');
        }

        if (bookBtn) {
            // 스크롤 바 사라짐
            $('body').addClass('no-scroll');
            if(min1024.matches) {
                $('.header').addClass('on');
            }
            $('.book-area').css('display','block');
            // 메뉴가 닫혀있을 때  열기
            bookmenu.play();
            bookBtn = false;

            if(min1024.matches) {
                let clickedTarget = $(this);
                let otherElements = $('.btn.hdest, .btn.menu, .btn.mark').not(clickedTarget);

                // 클릭한 요소와 다른 버튼이 모두 클래스명 on을 가지고 있다면 메뉴 중복 클릭 증가
                if (otherElements.hasClass('on') && clickedTarget.hasClass('on')) {
                    clicked++;
                }
            }

        } else {
            // 스크롤 바 다시 나타남
            $('body').removeClass('no-scroll');
            $('.book-area').css('display','none');
            // 메뉴가 열려있을 때  닫기
            bookmenu.reverse();
            bookBtn = true;
            if(min1024.matches) {
                if (!headerFix && clicked === 0) {
                    $('.header').removeClass('on');
                } else {
                    clicked--;
                }
            }
        }
    });

    //book-area tab click
    $('.book-area .tab-item').click(function(){
        let tabcatag = $(this).data();
        $(this).addClass('on').siblings().removeClass('on');
        $('.' + tabcatag['tab']).addClass('on').siblings().removeClass('on');
    })

    // sc-visual ===================================================================
    if (min1024.matches) {
        gsap.registerPlugin(ScrollTrigger);
            let visScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sc-visual",
                    pin: true,   
                    start: "top top",
                    end: "+=500",
                    scrub: 1,
                  }
        });
        visScroll.fromTo(".sc-visual .video-area", {transform: "scale(0.7, 0.6)"}, {transform: "scale(1.5, 1.4)"});

        // down-btn scroll
        $('.sc-visual .down-btn').click(function(){
            $( 'html, body' ).stop().animate({scrollTop : '676'}, 50);
        });
    };

    // sc-dest ===================================================================
    // dest-list hover
    $('.sc-dest .dest-item').mouseover(function(){
        $(this).css('flex', '2');
        $(this).siblings().css('flex', '1');
    });
    $('.sc-dest .dest-item').mouseleave(function(){
        $(this).css('flex', '1');
    });

    // sc-desc gsap 애니메이션
    let destScroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-dest .dest-list",
            start: "top bottom",
            end: "bottom bottom-=50",
            ease: "power3",
            once: true}
    });
    destScroll.fromTo(".sc-dest .headline", {autoAlpha: 0, duration: 3.5},{
        autoAlpha: 1});
    destScroll.fromTo(".sc-dest .dest-list", {autoAlpha: 0, duration: 0.5},{
        autoAlpha: 1});
          

    // sc-intro ===================================================================
    // sc-intro fade animation
    let introScroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-intro",
            start: "top bottom",
            end: "bottom bottom",
            ease: "power3",
            once: true},
        onStart: function() {
            // 시작할 때 클래스 조작
            $(".sc-intro").addClass("on");
          }
    });
    introScroll.fromTo(".sc-intro .img-box", {autoAlpha: 0},{
        autoAlpha: 1});
    introScroll.fromTo(".sc-intro .headline", {x: -100, autoAlpha: 0, duration: 0.3},{
        x: 0, autoAlpha: 1});
    introScroll.fromTo(".sc-intro .desc-group", {x: -100, autoAlpha: 0, duration: 0.3},{
        x: 0, autoAlpha: 1, delay: 0.3});
    introScroll.fromTo(".sc-intro .marquee-area", {autoAlpha: 0, duration: 0.3},{
        autoAlpha: 1});

    // intro scroll marquee
    const marqTop = $('.sc-intro .marquee-area .top-box');
    const marqBottom = $('.sc-intro .marquee-area .bottom-box');

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".sc-intro .marquee-area", 
        start: "top+=100 bottom",
        end: "bottom+=500 bottom", 
        scrub: 1, 
        onUpdate: (self) => {
        // 트리거 이벤트 내의 실시간 스크롤 진행값
        let progress = self.progress;

        gsap.to(marqTop,{
            x: `-${progress * 100}%`});
        
        // 초기 시작 위치값 조정을 위해 140% 빼기
        gsap.to(marqBottom,{
            x: `${progress * 100 - 140}%`});
        },
      });

    // sc-desc ===================================================================
    // sc-desc fade animation
    let descScroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-desc .layout-inner",
            start: "top bottom",
            end: "bottom bottom",
            ease: "power3",
            once: true,
            },
        onStart: function() {
            // 시작할 때 클래스 조작
            $(".sc-desc").addClass("on");
          }
    });
    descScroll.fromTo(".sc-desc .bg-box01", {autoAlpha: 0, duration: 0.0},{
        autoAlpha: 1, delay: 0.3});
    descScroll.fromTo(".sc-desc .bg-box02", {autoAlpha: 0, duration: 0.0},{
        autoAlpha: 1, delay: 0.3});
    descScroll.fromTo(".sc-desc .text-area", {x: -100, autoAlpha: 0, duration: 0.3},{
        x: 0, autoAlpha: 1, delay: 0.3});
    descScroll.fromTo(".sc-desc .bg-box03", {autoAlpha: 0, duration: 0.3},{
        autoAlpha: 1, delay: 0.3});
    descScroll.fromTo(".sc-desc .bg-box04", {autoAlpha: 0, duration: 0.3},{
        autoAlpha: 1});
    

    // cookie ===================================================================
    // cookie-btn click
    $('.cookie-wrapper .cookie-btn').click(function(){
        $('.cookie-wrapper .cookie-content').slideToggle();
    });

    // cookie-area close
    $('.cookie-area .close-btn').click(function(){
        $('.cookie-wrapper .cookie-content').slideToggle(50);
    });

    // detail-box open
    $('.cookie-area .detail-btn').click(function(){
        $(this).toggleClass('on');
        $('.cookie-area .detail-box').slideToggle(50);
    });

})

