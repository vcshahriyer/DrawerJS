// import { callDrawer } from "./drawer.js";

// add css file
var css = document.createElement("link");

css.href = "drawerStyle.css";
css.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(css);
// add JQuery
var jquer = document.createElement("script");
jquer.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(jquer);

setTimeout(function() {
  (function() {
    var apiUrl = "http://localhost:3000";
    //Build a pseudo-class to prevent polluting our own scope.
    var api = {
      Settings: {},
      Vox: {},
      LoadSettings: function() {
        console.log("shop");
        var element = document.getElementById("emitrr-cta");
        if (!element) console.warn("element not found");
        var projectToken = element.getAttribute("data-project");
        console.log("p", projectToken);
        const Http = new XMLHttpRequest();
        const url = apiUrl + "/cta/fetch_cta/" + projectToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = e => {
          if (Http.readyState != 4) return;

          if (Http.status === 200) {
            // This will contain the colors of CTA button, positon and text;
            console.log(JSON.parse(Http.responseText));
            this.LoadCtaScripts(JSON.parse(Http.responseText));
          }
        };
        //This function will load the CTA button .
      },
      /**
       * Load the element using JS in which position (top-left, bottom-left, top-right, bottom-right), colors and text
       * are customizable
       *  */

      LoadCtaScripts: function(settings) {
        // TODO: Write code here in JS. Also load the CSS using a separate file.
        console.log("settings", settings);
        var $feedDrawer = null;
        var $feedTrigger = null;
        var feedSessInfo = null;

        function callDrawer(position = "centerRight", trigger) {
          $(function() {
            createFeedbackForm(trigger);
            if (position === "centerLeft" || position === "bottomLeft") {
              $feedTrigger.addClass("bottomLeft-feedbacktrigger");
              //Dynamic css
              var feedwidth = $feedDrawer.outerWidth();
              $feedDrawer.css("left", feedwidth * -1 + "px");
              var trigwidth = $feedTrigger.outerHeight() + feedwidth;
              $feedTrigger.css("left", trigwidth + "px");
              //end dynamic css
              $feedTrigger.click(showDrawerLeft);
            }

            if (position === "bottomRight" || position === "centerRight") {
              //Dynamic css
              var width = $feedDrawer.outerWidth() * -1;
              $feedDrawer.css("right", width + "px");
              var trigwidth = $feedTrigger.outerHeight();
              $feedTrigger.css("left", trigwidth * -1 + "px");
              //end dynamic css
              $feedTrigger.click(showDrawer);
            }

            $feedDrawer.addClass(position);
            // for different frowser
            // $feedDrawer.addClass("isie");
          });
        }

        function createFeedbackForm(triggerText = "") {
          var url = document.location;
          feedSessInfo = {
            userId: "123456789",
            userName: "Aebb",
            userCompany: "Company XYZ",
            userEmail: "aj.webb@companyxyz.com",
            admin: "#"
          };

          //create drawer
          var $drawer = '<div id="feedbackDrawer">';
          $drawer += "<h2>Ask Alexa to order</h2>";
          //create form
          $drawer += '<div id="feedbackForm">';
          $drawer +=
            '<div class="drawer-content"><h4>This is a sub heading</h4>\
          <P>This is a dummy paragraph about alexa.<br/> smart feedback system .</P></div>';
          $drawer += '<button class="btn">Submit</button>';
          $drawer += "</form>";
          $drawer += "</div>";
          //end form
          //create trigger
          $drawer += '<div id="feedbackTrigger">' + triggerText;
          $drawer += '<span id="close">&raquo;</span>';
          $drawer += "</div>";
          //end trigger
          $drawer += "</div>";
          //end drawer
          $("body").append($drawer);

          //set global vars
          $feedDrawer = $("#feedbackDrawer");
          $feedError = $("#feedbackError");
          $feedForm = $("#feedbackForm");
          $feedSuccess = $("#feedbackSuccess");
          $feedTrigger = $("#feedbackTrigger");
        }

        function showDrawer() {
          $feedDrawer.toggleClass("showDrawer");
          return false;
        }
        function showDrawerLeft() {
          $feedDrawer.toggleClass("showDrawer-left");
          return false;
        }
        // 4 classes "centerRight","bottomRight", "bottomLeft", "centerLeft"

        callDrawer("centerLeft", "Ask Alexa to book service");
      }
    };

    //For production
    // api.LoadSettings();

    //For testing: call LoadSettingsDirectly
    api.LoadCtaScripts({
      position: "top-right",
      theme: "red",
      sideText: "Ask alexa to book cleaning service",
      boxHeading: "Enable skill to book",
      boxSubheading: "Once enabled just say - Alexa, open queen laundry",
      buttonText: "Enable",
      buttonUrl: "https://www.amazon.com/gp/product/B07V611MZP"
    });
  })();
}, 200);
