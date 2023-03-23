/* DECLARING VARIABLE & CONSTANTS */
const body = document.body;
const mainContainer = document.getElementById("mainContainer");
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');
const headerText = [
    ["<span>Soon on Kickstarter /&nbsp</span>"],
    ["<span>march, issue no°3 /&nbsp</span>"],
    ["<span>february, issue no°2 /&nbsp</span>"],
    ["<span>january, issue no°1 /&nbsp</span>"]
];
const footerText = [
    ["<span>Launching in " + "00:00:00" + " /&nbsp</span>"],
    ["<span>giacomo bagnara /&nbsp</span>"],
    ["<span>kate prior /&nbsp</span>"],
    ["<span>maría jesús contreras /&nbsp</span>"]
];
const section1 = document.querySelector('.section-1');
const sections = document.querySelectorAll('.section');
const introText = document.querySelector('#introText');
const legal = document.querySelector('#legal');
const cta = document.querySelector('#cta');
const btnContainer = document.querySelector('#btnContainer');
const mcForm = document.querySelector('#mcForm');
const mcFormWrapper = document.querySelector('#subscribe-form');
const artwork1 = document.querySelector('#artwork1');
const artwork2 = document.querySelector('#artwork2');
const artwork3 = document.querySelector('#artwork3');
let yIndex = 0;
let color1;
let color2;
let color3;
let thanks;

/* DYNAMICALLY UPDATE YINDEX */
let currentSection = null;
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.getAttribute('id');
            const sectionNum = +sectionId.match(/\d+/)[0];
            if (sectionNum !== currentSection) {
                yIndex = sectionNum;
                updateMarquees();
                currentSection = sectionNum;
                updateCTA();
            }
        }
    });
}, { threshold: 0.5 });
sections.forEach(section => {
    sectionObserver.observe(section);
});

/* SCROLLING TO AND FROM SECTION 0 */
document.getElementById("slide2").addEventListener('wheel', event => {
    if (event.deltaY < 0 && yIndex === 1) {
        mainContainer.style.marginTop = '100vh';
        yIndex = 0;
        updateMarquees();
        updateCTA();
        resetIntroText();
    }
});
body.addEventListener('wheel', event => {
    if (event.deltaY > 0 && yIndex === 0) {
        mainContainer.style.marginTop = '0';
        yIndex = 1;
        updateMarquees();
        updateCTA();
    }
});

/* UPDATE MARQUEES */
function updateMarquees() {
    if (yIndex % 2 === 1) {
        header.style.opacity = "0";
        footer.style.opacity = "0";
    } else {
        header.innerHTML = headerText[(yIndex / 2)].toString().repeat(50);
        footer.innerHTML = footerText[(yIndex / 2)].toString().repeat(50);
        header.style.opacity = "1";
        footer.style.opacity = "1";
    }
}

/* UPDATE INTRO TEXT */
function loadIntroText() {
  const introText = document.getElementById("introText");
  for (let i = 1; i <= 5; i++) {
    const div = document.createElement("div");
    div.className = "intro-text";
    div.style.backgroundImage = `url('/assets/text_svgs/text${i}.svg')`;
    div.style.opacity = i === 1 ? 1 : 0;
    introText.appendChild(div);
  }

  setTimeout(() => {
    const divs = introText.getElementsByClassName("intro-text");
    let i = 0;
    const fadeNextDiv = () => {
      setTimeout(() => {
        if (i < divs.length - 1) {
          divs[i].style.opacity = 0;
          i++;
          divs[i].style.opacity = 1;
          fadeNextDiv();
        }
      }, 500);
    };
    fadeNextDiv();
  }, 1000);
}
function resetIntroText() {
  const introTextDivs = document.querySelectorAll('.intro-text');
  introTextDivs.forEach((div, i) => {
    div.style.opacity = i === 0 ? 1 : 0;
  });
  let i = 0;
  const fadeNextDiv = () => {
    setTimeout(() => {
      introTextDivs[i].style.opacity = 0;
      i = (i + 1) % introTextDivs.length;
      introTextDivs[i].style.opacity = 1;
      if (i !== introTextDivs.length - 1) {
        fadeNextDiv();
      }
    }, 500);
  };
  setTimeout(() => {
    fadeNextDiv();
  }, 500);
}

/* FORM & CTA INTERACTIONS */
cta.addEventListener('click', function() {
    if (isValidEmail(textInput.value)) {
        createConfetti();
        displayThanks();
        cta.innerHTML = "All Set!"
    }
    else {
        textInput.value = "Please try again!";
        textInput.placeholder = "Please try again!";
    }
});
textInput.addEventListener('focus', function() {
    if (textInput.value == "Please try again!") {
        textInput.value = "";
    }
});
textInput.addEventListener('blur', function() {
    if (textInput.value == "Please try again!") {
        textInput.value = "";
    }
});
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function updateCTA() {
    if (yIndex % 2 !== 0) {
        setTimeout(function() {
            legal.style.bottom = "1vh";
            btnContainer.style.opacity = 1;
            textInput.style.pointerEvents = "all";
        }, 250);
    }
    else if (yIndex % 2 == 0) {
        legal.style.bottom = "-5vh";
        btnContainer.style.opacity = 0;
        textInput.style.pointerEvents = "none";
    }
    if (yIndex == 1) {
        color1 = "#ffee00";
        color2 = "#00eaff";
        color3 = "#eb006d";
    }
    else if (yIndex == 3) {
        color1 = "#eb006d";
        color2 = "#ffee00";
        color3 = "#00eaff";
    }
    else if (yIndex == 5) {
        color1 = "#00eaff";
        color2 = "#eb006d";
        color3 = "#ffee00";
    }
    else if (yIndex == 7) {
        color1 = "white";
        color2 = "white";
        color3 = "white";
    }

    cta.style.backgroundColor = color1;
    textInput.style.boxShadow = "inset 0 0 0 0.15vh " + color2;
    textInput.style.color = color2;
    legal.style.color = color3;
}
textInput.addEventListener("keydown", function(event) {
  // Check if the "enter" key was pressed
  if (event.keyCode === 13) {
    // Prevent the default "post" action
    event.preventDefault();
    // Trigger a click on the "cta" element
    cta.click();
  }
});

/* CONFETTI */
function disableAllPointerEvents() {
  const allElements = document.querySelectorAll("*");
  for (let i = 0; i < allElements.length; i++) {
    allElements[i].style.pointerEvents = "none";
  }
}
function displayThanks() {
    textInput.blur();
    disableAllPointerEvents();
    thanks = document.getElementById("slide" + currentSection);
    if (usersIsOnMobile) {
        thanks.style.backgroundImage = "url('assets/text_svgs/thanks_mobile.svg')"
    }
    else {
        thanks.style.backgroundImage = "url('assets/text_svgs/thanks.svg')"
    }
    cta.style.backgroundColor = "white";
    textInput.style.boxShadow = "inset 0 0 0 0.15vh " + cta.style.backgroundColor;
    textInput.style.color = cta.style.backgroundColor;
    legal.style.color = cta.style.backgroundColor;
    submitMailchimpForm();
}
function createConfetti() {
    var maxParticleCount = 150; //set max confetti count
    var particleSpeed = 2; //set the particle animation speed
    var startConfetti; //call to start confetti animation
    var stopConfetti; //call to stop adding confetti
    var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
    var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

    (function() {
      startConfetti = startConfettiInner;
      stopConfetti = stopConfettiInner;
      toggleConfetti = toggleConfettiInner;
      removeConfetti = removeConfettiInner;
      var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
      var streamingConfetti = false;
      var animationTimer = null;
      var particles = [];
      var waveAngle = 0;

      function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
      }

      function startConfettiInner() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimFrame = (function() {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, 16.6666667);
            };
        })();
        var canvas = document.getElementById("confetti-canvas");
        if (canvas === null) {
          canvas = document.createElement("canvas");
          canvas.setAttribute("id", "confetti-canvas");
          canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
          document.body.appendChild(canvas);
          canvas.width = width;
          canvas.height = height;
          window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }, true);
        }
        var context = canvas.getContext("2d");
        while (particles.length < maxParticleCount)
          particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        if (animationTimer === null) {
          (function runAnimation() {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if (particles.length === 0)
              animationTimer = null;
            else {
              updateParticles();
              drawParticles(context);
              animationTimer = requestAnimFrame(runAnimation);
            }
          })();
        }
      }

      function stopConfettiInner() {
        streamingConfetti = false;
      }

      function removeConfettiInner() {
        stopConfetti();
        particles = [];
      }

      function toggleConfettiInner() {
        if (streamingConfetti)
          stopConfettiInner();
        else
          startConfettiInner();
      }

      function drawParticles(context) {
        var particle;
        var x;
        for (var i = 0; i < particles.length; i++) {
          particle = particles[i];
          context.beginPath();
          context.lineWidth = particle.diameter;
          context.strokeStyle = particle.color;
          x = particle.x + particle.tilt;
          context.moveTo(x + particle.diameter / 2, particle.y);
          context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
          context.stroke();
        }
      }

      function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
          particle = particles[i];
          if (!streamingConfetti && particle.y < -15)
            particle.y = height + 100;
          else {
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle);
            particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
          }
          if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
            if (streamingConfetti && particles.length <= maxParticleCount)
              resetParticle(particle, width, height);
            else {
              particles.splice(i, 1);
              i--;
            }
          }
        }
      }
    })();
    startConfetti();
}

/* MAILCHIMP*/
function submitMailchimpForm(){
    ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

    // Turn the given MailChimp form into an ajax version of it.
    // If resultElement is given, the subscribe result is set as html to
    // that element.
    function ajaxMailChimpForm($form, $resultElement){

        // Hijack the submission. We'll submit the form manually.
        $form.submit(function(e) {
            e.preventDefault();

            if (!isValidEmail($form)) {
                var error =  "A valid email address must be provided.";
                $resultElement.html(error);
                $resultElement.css("color", "red");
            } else {
                $resultElement.css("color", "black");
                $resultElement.html("Subscribing...");
                submitSubscribeForm($form, $resultElement);
            }
        });
    }

    // Validate the email address in the form
    function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }

        return true;
    }

    // Submit the form with an ajax/jsonp request.
    // Based on http://stackoverflow.com/a/15120409/215821
    function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "GET",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c", // trigger MailChimp to return a JSONP response
            contentType: "application/json; charset=utf-8",

            error: function(error){
                // According to jquery docs, this is never called for cross-domain JSONP requests
            },

            success: function(data){
                if (data.result != "success") {
                    var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                    $resultElement.css("color", "red");

                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You're already subscribed. Thank you.";
                        $resultElement.css("color", "black");
                    }

                    $resultElement.html(message);

                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
                }
            }
        });
    }
    mcForm.value = textInput.value;
    $("#subscribe-form").submit();
}

/* INITIALIZE */
updateMarquees();
mainContainer.style.marginTop = "100vh";
mcFormWrapper.style.position = "fixed";
mcFormWrapper.style.opacity = 0;
mcFormWrapper.style.pointerEvents = "none";
loadIntroText();
setTimeout(function() {
    body.style.pointerEvents = "auto";
    mainContainer.style.overflow = "scroll";
    yIndex++;
    btnContainer.style.display = "flex";
    updateCTA();
    requestAnimationFrame(() => {
        mainContainer.scrollTo(0, 0);
        mainContainer.style.marginTop = "0px";
    });
}, 4000);