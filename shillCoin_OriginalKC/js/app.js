(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
mixpanel.init("d2e970ea72a03c63b1990987c420927b");

// ATTEMPT to increment a super property for Number of Assets Displayed on Table.
// incrementer = function("# of Assets on Table") {
//     value = mixpanel.get_property("# of Assets on Table");
//     update = {};
//     if (value && typeof(value) == 'number') {
//             update["# of Assets on Table"] = value +1; }

//     else {
//             update["# of Assets on Table"] = 1
//     }   
//     mixpanel.register(update);
// };


// SHILLCOIN (by AK)
// a client-side-only SPA that can be served directly from the file:// protocol in the CHROME browser
// (that means you can open index.html in CHROME and it just works) - KC, This has worked properly. 
// (it also means you don't need a server, so you can just edit this code locally, press save, and then refresh the page to see changes)
// (note: use a 'HARD' refresh when so doing cmd+shit+r)

// we're going to build shillcoin in semi-modular fashion using an object literal pattern
// this is a fancy way of saying 'let's have just one global object called "app" which everything lives on!'
// there are many reasons to build apps like this; if you're wondering why, watch this: https://bit.ly/modjsmp
// seriously. watch it. at LEAST the first 3 videos. they are not that long.

// ok herewegoooo.....

var app = {
    // we need a few METHODS (functions that live on an objects) to DEFINE the app's life-cycle 
    // 'life-cycle' is a fancy way of saying 'all the different tasks' that the app must do or preform while it's 'running'
    // a 'task' is a thing that has to happen frequently, like binding 'click' events to buttons, hitting an API and getting data, or outputting data on the page
    // (this is what front-end frameworks like react and angular do for you, except they use a lot more code, and have a lot more files)
    // ... but we-don't-need-no-stinkin' framework; we can do all this ourselves!

    // ok... so herewegoooo..... (for realz)


    // init() is the core method we'll use start our app up! it should ONLY ever be called ONCE... the first time the app starts up!
    // (look at the bottom of this file and you'll see what i mean!)
    // init() is essentially going to give our app instructions about what order to run our 'life-cycle' methods in, and then it's going to run them!
    init: function() {
        console.log('app init!');

        //'this' refers to 'app' in the context below; read more about 'this' in JS: https://bit.ly/thisInJS
        this.cacheDOM(); // <-- for example becomes 'app.cacheDOM()' at runtime
        this.bindEvents();
        this.checkUser();

        // getCryptos() is an asynchronous (aysnc) part of our app
        // it is async because it fetches data from an API and then displays that data 'later'
        // there are a few patterns in JS to deal with the 'later' part - we're going to use 'Promises' (which is what the .then() is all about)
        // read more about promises in JS: https://bit.ly/promisesInJS
        this.getCryptos().then(() => {

            this.render() //render draws the page!

            mixpanel.register({"Original Theme": app.DOM.app.classList[0]});
            mixpanel.register({"# of Coins Shown": app.DOM.numOfCoinSelector.value});

        //TRACK EVENT - View Homepage
        //mixpanel.track("View Homepage");
        })
    },

    // 'DOM' is going to start as an empty object
    // we're going to use it to 'cache' certain HTML elements, so they are easy for us to find later
    DOM: {},

    // cacheDOM() is the ONLY function we'll use to query the DOM (document object model)
    // the DOM is javascript's API for interacting with the actual HTML that gets displayed... the DOM connects javascript and HTML
    // ^ this is a very important concept; if it is fuzzy, read this: https://bit.ly/wtfEvenIsTheDOM
    // caching the DOM elements that we need to refer to ahead of time makes our app faster, and clearer to read
    // the cacheDOM() method will store it's values in the 'DOM' object we just created so we can later retrieve them by looking at app.DOM
    cacheDOM: function() {
        console.log('dom cached!')
        this.DOM.loader = document.getElementById('loader')
        this.DOM.app = document.getElementById('app')
        this.DOM.loginState = document.getElementById('loginState');
        this.DOM.logInButton = document.getElementById('logIn');
        this.DOM.logOutButton = document.getElementById('logOut');
        this.DOM.memeBreakButton = document.getElementById('memeBreak');
        this.DOM.refreshDataButton = document.getElementById('refreshData');
        this.DOM.numOfCoinSelector = document.querySelector('#numberOfCoinShown > select');
        this.DOM.coinPicker = document.getElementById('coinPicker');
        this.DOM.table = document.getElementById('theTable');
        this.DOM.themeDefault = document.getElementById('defaultTheme');
        this.DOM.themeFoobar = document.getElementById('foobarTheme');
        this.DOM.themeMasterHacker = document.getElementById('masterHackerTheme');


    },
    
    // bindEvents() is where we register all the 'click' events to do the things we need when the user interacts with UI elements
    // an important part of any web application is that when the user interacts with the UI - 'something' happens behind the scenes
    // bindEvents() is the glue for that 'something'
    // read more about why we need to use .bind(this) to make sure the context is 'app' instead of the DOM element itself: http://bit.ly/bindAndThis
    bindEvents: function() {
        console.log('events bound!');

        // user clicks log in button
        this.DOM.logInButton.addEventListener('click', this.logIn.bind(this));
        // user clicks log out button
        this.DOM.logOutButton.addEventListener('click', this.logOut.bind(this));
        // user clicks meme break button
        this.DOM.memeBreakButton.addEventListener('click', this.memeBreak.bind(this));
    


        this.DOM.themeDefault.addEventListener('click', () => {
            // what's this () => thing for the callback ^^^^^^^
            // it's an ARROW function and it helps us bind the 'this' context to our our 'app' object without doing the .bind(this) trickery
            // more on arrow functions and why they rock: https://bit.ly/mpArrowFunctions
            this.render(null, null, 'themeDefault') //we're passing null, so just the theme is rendered
            
            mixpanel.track("Change Theme", {"Changed Theme": "themeDefault"});
            mixpanel.register({"Original Theme": "themeDefault"});
            
        })
        
        this.DOM.themeFoobar.addEventListener('click', () => {
            this.render(null, null, 'themeFoobar')
            mixpanel.track("Change Theme",{"Changed Theme":"themeFoobar"});

            mixpanel.register({"Original Theme": "themeFoobar"});
            

        })
        
        this.DOM.themeMasterHacker.addEventListener('click', () => {
            this.render(null, null, 'themeMasterHacker')
            
            mixpanel.track("Change Theme", {"Changed Theme": 'themeMasterHacker'});

            mixpanel.register({"Original Theme": "themeMasterHacker"});
            
        })

        // user clicks 'refresh data' button
        this.DOM.refreshDataButton.addEventListener('click', () => {
            this.destroyData()
            this.render()
            mixpanel.register({"# of Coins Shown": this.DOM.numOfCoinSelector.value});    
            mixpanel.track("Refresh Data");
        
        });


    },

    // render() is clutch; it's basically going to re-draw the page when we need it to...
    // we're going to pass render a fully-baked HTML object to render AND a location to render it to (but only sometimes)
    // render() may also update the theme, if we tell it to...
    // when render() is called WITHOUT arguments, it's going to do some routine clean-up of the UI
    // IMPORTANT: render() is the ONLY method which actually 'touches' (inserts elements into) the DOM
    // this allows for good 'separation of concerns'
    render: function(htmlObject, location, theme) {
        console.log('render called!')

        //if render() gets an HTML object, let's render() it and place it where needs to go!
        if (htmlObject) {
            this.DOM[location].appendChild(htmlObject)
        }

        // otherwise if render() gives us a 'theme', apply it
        else if (theme) {
            // remove existing theme
            this.DOM.app.className = '';
            // add new theme
            this.DOM.app.className = theme;
        }

        // if there's no specific object to render, do 'routine' render() things (kinda like init() but just for the UI)
        else {

            // hide the loader and show the app
            this.DOM.loader.style.display = "none";
            this.DOM.app.style.display = "block";

            // check for login state
            if (this.user.uuid !== "foobarbaz") {
                this.DOM.loginState.innerText = `You are now logged in as ${this.user.name}`;
                this.DOM.logInButton.disabled = true;
                this.DOM.logOutButton.disabled = false;
                

                // mixpanel.track("Log In", {'name': this.user.name, "Interests": this.user.interests});
                mixpanel.identify(this.user.uuid); //getUserId.identity.uuid
                mixpanel.register({"name": this.user.name, "Interests": this.user.interests});
                mixpanel.people.set({"name": this.user.name, "Interests": this.user.interests});  

            } else {
                this.DOM.loginState.innerText = `You are not logged in`;
                this.DOM.logInButton.disabled = false;
                this.DOM.logOutButton.disabled = true;
                
            }

            // check coin picker value from the dropdown
            for (var i = 0; i < this.DOM.numOfCoinSelector.value; i++) {
                // go build the divs we need for the coinpicker
                this.templates.buildCoinPickerDiv(this.allTheCoinData[i]).then((htmlObject) => {
                    //actually add the HTML to the coinPicker div 
                    this.DOM.coinPicker.appendChild(htmlObject)

                })
            }
        }
    },

    // destroyData() is going to wipe out our table AND the coinPicker
    destroyData: function() {
        console.log('destroy data called!')

        // clear the coin picker
        this.DOM.coinPicker.innerHTML = "" //yup; it's that simple :)

        // clear the table, but ONLY if there is more than one row of data
        var numRows = this.DOM.table.childElementCount
        if (numRows > 1) {
            // we're going to decrement a counter using a for loop; because we want to remove the LAST row FIRST
            for (var i = numRows - 1; i >= 1; i--) {
                this.DOM.table.deleteRow(i)
            }
        }

        // kill all the memes
        if (this.DOM.app.children[5]) {
            for (var i = this.DOM.app.childElementCount - 1; i >= 5; i--) {
                this.DOM.app.children[i].remove()
            }
        }
    },

    // check localStorage to see if we have a logged in user; NORMALLY this would be done on the server
    checkUser: function() {
        console.log('checking for a user...')
        var storedUser = JSON.parse(localStorage.getItem('user'))
        // console.log(storedUser) //added to see
        if (storedUser) {
            console.log('... user found');
            this.user = storedUser;  
                
        } else {
            console.log('... no user found; using default user')
            this.user = {
                "uuid": "foobarbaz",
                "displayName": "foo bar"
            }
        }

    },

    // getUserId() is going to generate a new (random) user for us; NORMALLY this would be done on the server
    getUserId: function() {

        // this function implements the 'Promise' pattern; that's why it's called with .then() when we call getUserId() in the logIn() method
        // it's asynchronous (async), because we have to hit an API to get data and wait for a response
        // ^ so the first thing the function has to do is return a promise (which is an object - but it's a special type of object) 
        // a promise (object) represents a FUTURE value that is eventually passed to .then() by it's caller - in this case logIn()
        // read more about async code in JS: https://bit.ly/promisesInJS
        return new Promise(function(resolve, reject) {

            // first, generate a random UUID for each user
            var validChars = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            var identity = {};
            identity.uuid = "";

            for (var i = 0; i < 64; i++) {
                // bonus points if you can tell me what these values represent :) ... msg @ak, i'll give you a prize
                identity.uuid += validChars[Math.floor(Math.random() * validChars.length)];
            }

            // next, generate a random name using a service i found to do that: https://www.name-generator.org.uk/quick/
            // (HINT: this is the async part of this function)
            function getRandomName() {
                // there is a little bit of 'magic' here; we're doing some tricky things to avoid needing a server of our own
                // normally we can't fetch() for URLs outside our domain due to something called the 'Content Security Policy' (CSP)
                // however, there are rules for 'Cross-Origin Resource Sharing' (CORS) which we can exploit to make our app work
                // you can read more about CORS here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                // and here's the proxy server that I'm using to get around CORS restrictions: https://github.com/Rob--W/cors-anywhere

                //make a new object which can 'parse a DOM'
                var parser = new DOMParser();

                // get entire page below
                fetch('https://cors-anywhere.herokuapp.com/https://www.name-generator.org.uk/quick/').then(function(response) {
                    // turn the response into text
                    response.text().then(function(html) {
                        // grab the HTML and parse it
                        var htmlDoc = parser.parseFromString(html, "text/html");
                        // grab the first name from one of those DOM elements
                        var name = htmlDoc.querySelector("#main > div > form > div:nth-child(4)").innerText
                        identity.name = name
                            // tell the promise it's finished
                        resolve(identity)
                    })
                })

            }
            // actually go get the name!
            getRandomName();

            // also generate some random interests that the user has
            function generateInterests() {
                identity.interests = []
                var validInterest = ['ICOs', 'Arbitrage', 'Scaling', 'Sharding', 'Web3', 'Plasma', 'Mining', 'Dapps', 'Solidity', 'Smart Contracts', 'Cryptography', 'Memes', 'Networking', 'Dubstep'];

                // this is a tricky for loop; it does what it needs to do, but readability could be improved
                for (var i = 0; i < Math.floor(Math.random() * validInterest.length); i++) {
                    var randomIndex = Math.floor(Math.random() * validInterest.length);
                    identity.interests.push(validInterest[randomIndex]);
                    validInterest.splice(randomIndex)
                }

                if (!identity.interests[0]) {
                    identity.interests.push('No Interests')
                }
            }

            //actually generate those interests!
            generateInterests();

        })
    },

    // logIn() is now simple, because it uses helper methods to do the work
    logIn: function() {
        this.destroyData();
        this.getUserId().then((identity) => this.user = identity).then(() => {
            localStorage.setItem('user', JSON.stringify(app.user))
            this.render()
            mixpanel.track("Log In");
        });

        

       

    },

    // logOut() is also simple... because... (it uses helper methods to do the work!)
    logOut: function() {
        this.user = null;
        localStorage.clear();
        this.destroyData();
        this.checkUser();
        this.render();

        mixpanel.track("Log Out");     
        mixpanel.reset(); 


    },

    // at this point we have the core piping of our app's different 'states'
    // we have cached all the DOM elements we need, we have a method to paint them on the screen, for log in/log out, and we 'glue' for binding click events
    // what we are MISSING is code to actually BUILD the HTML tags for the table, and the coinPicker icons
    // these HTML tags have to be dynamically built, because we're showing dynamic data returned from an API

    // we're going to MIRROR the object literal pattern we used for 'app' and create an object inside of 'app' called 'templates' 
    // templates will be a series of functions which take in a JSON about a 'coin', and do various tasks to build HTML objects
    // we'll finally render that HTML to the DOM using render(), which is going to give our app the SPA feel (no page refreshes)
    // think of 'templates' like a factory that's going to build the coinPicker divs, the table rows, and the conversion input boxes
    // in reality, our 'templates' object is going to conceptually borrow from the concept of 'components' in frameworks like React, Angular, Django, Vue, Rails, etc...
    //  (^ this is an oversimplification of components because they do other things too)

    templates: {
        //lets build the HTML for the coinPicker
        buildCoinPickerDiv: function(coin) {

            // since 'fetching' the coin's image (for the icon) is going to be an async task, we'll use the promise pattern again
            return new Promise(function(resolve, reject) {
                // 'fetching' the coin will be delegated to getIconData()
                app.getIconData(coin).then(function(imageBlob) {

                    // now we'll use 'template literals' to build a string with dynamic values
                    // read more on template literals: http://bit.ly/tempLit (they are easy)
                    var HTMLstring = `<span><img id="${coin.name}Picker" height=37><label>${coin.name}</label></span>`

                    // make this string into an HTML object
                    var htmlObject = document.createElement('div');
                    htmlObject.classList.add("coinPickerItem")
                    htmlObject.innerHTML = HTMLstring;

                    // we also need to bind some listeners to the same HTML object that we're building
                    htmlObject.addEventListener('click', function() {
                        // we don't use arrow functions ()=>{} ^here^ because we want the 'this' value to refer the DOM element we're building

                        this.classList.add('selected') //mark the coin selected

                        app.templates.buildTableRowHTML(coin) //pass the template to our next templating function
                        // console.log('buttonclick');
                        // console.log(coin);
                        
                        mixpanel.track("Select Asset", 
                            {"Coin": coin.name, 
                            "Symbol": coin.symbol, 
                            "Price Value": coin.price, 
                            "Market Cap": coin.marketCap, 
                            "1 Hr %": coin.change1hr, 
                            "24 Hr %": coin.change24hr 
                        });

                        // mixpanel.register("# of Assets on Table")
                    
                    }, { once: true }); // nifty little way to make sure a listener can only be called once: https://mzl.la/2vbjZBU

                    // take the image we got from getIconData() and add it to our HTML tag
                    htmlObject.getElementsByTagName('img')[0].src = URL.createObjectURL(imageBlob);

                    // signal that we are done
                    resolve(htmlObject);
                });

            })
        },

        // let's build the table rows
        // since we already have all the data we need, we don't need to to make this code async, but it still follows the pattern above
        buildTableRowHTML: function(coin) {
            // should the % be green or red?
            var greenOrRed = function(percentageChange) {
                if (percentageChange.indexOf('-') === -1) {
                    return 'green'
                } else {
                    return 'red'
                }
            }
            var color1hr = greenOrRed(coin.change1hr);
            var color24hr = greenOrRed(coin.change24hr);

            var HTMLstring = `<td class="coinSign ${coin.shortCode}">${coin.symbol}</td>
                        <td class="coinValue ${coin.shortCode}">${coin.price}</td>
                        <td class="marketCap ${coin.shortCode}">${coin.marketCap}</td>
                        <td class="oneHr ${color1hr} ${coin.shortCode}">${coin.change1hr}</td>
                        <td class="24hr ${color24hr} ${coin.shortCode}">${coin.change24hr}</td>
                       
                        <td class="sentiment ${coin.shortCode}">
                            <span class="great">🤗</span>
                            <span class="good">😀</span>
                            <span class="meh">😶</span>
                            <span class="bad">😔</span>
                            <span class="trash">😡</span>
                            </td>
                        
                        <td class="conversion ${coin.shortCode}"><input type ="text"/ class="toUSD"><input type ="text"/ class="toCrypto"></td>
                        <td class="linkto ${coin.shortCode}"><a href="${coin.url}" target="_blank">${coin.name}</a></td>`

            //make the string into an HTML object
            var htmlObject = document.createElement('tr')
            htmlObject.innerHTML = HTMLstring;

            // now we pass our HTML along to the next function
            app.templates.convertFiatToCryptoInputs(htmlObject, coin)
            //calling the templates object under app to access the htmlObject and coin object values. 
            app.templates.selectSentiment(htmlObject,coin)
            app.templates.viewChart(htmlObject,coin)
        },
 

        selectSentiment: function(htmlObject, coin) {
            // console.log(coin);
            // console.log(htmlObject);

            for(var i=0; i < htmlObject.children[5].children.length; i++){
                
                htmlObject.children[5].children[i].addEventListener("click", function(event) {
                    sentValue = this;
                    var sentNumValue = 0;
                    
                    if (this.className === "great") {
                        sentNumValue = 5
                        // console.log(this.className);
                        // console.log(sentNumValue);
                    }

                    else if (this.className === 'good'){
                        sentNumValue = 4;
                    }

                    else if (this.className === 'meh'){
                        sentNumValue = 3;
                    }

                    else if (this.className === 'bad'){
                        sentNumValue = 2;
                    }

                    else {
                        sentNumValue = 1;
                    }


                    mixpanel.track("Select Sentiment", 
                        {"Coin":coin.name, 
                        "Symbol":coin.symbol, 
                        "Price": coin.price, 
                        "Market Cap": coin.marketCap, 
                        "1 Hr %": coin.change1hr, 
                        "24 Hr %": coin.change24hr, 
                        "Sentiment Response": this.className,
                        "Sentiment Value": sentNumValue
                    });
                    
                });
            }
        },

        // let's add functionality to the <input> boxes we created in buildTableRowHTML()
        // this should allow you to type a number in one box, and have it convert the value to the other box
        convertFiatToCryptoInputs: function(htmlObject, coin) {
            var cryptoValueInDollars = coin.price.substring(1, coin.price.length)
            var cryptoSuffix = coin.symbol;
            var fiatInputBox = htmlObject.children[6].firstChild
            var cryptoInputBox = htmlObject.children[6].lastChild
            // var fiatValueInCrypto = coin.price.substring(1, coin.price.length)

            // now we need we're going to write functions which control the <input> boxes' behaviors when the user types in them
            // notice how the code below is REALLY SIMILAR and REDUNANT
            // there's a virtue in coding called 'D-R-Y' (don't repeat yourself)
            // i'm leaving this code in, because it works and it's late at night
            // but if you are this deep in my comments and really learning this shit
            // this would be a wonderful piece of code to 'refactor'
            // so we don't repeat so much code that is really just doing the same thing twice

            // bind to every crypto field keypress
            cryptoInputBox.addEventListener("keyup", function(event) {
                var amountEntered = event.target.value;
                var convertedFiat = '$' + (amountEntered * cryptoValueInDollars).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString();
                fiatInputBox.value = convertedFiat;
                
            })

            // bind to every fiat field keypress
            fiatInputBox.addEventListener("keyup", function(event) {
                var amountEntered = event.target.value;
                var convertedCrypto = (amountEntered * 1 / cryptoValueInDollars).toFixed(5).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString();
                cryptoInputBox.value = convertedCrypto + ' ' + cryptoSuffix;

            })

            // cleanup crypto fields on blur
            cryptoInputBox.addEventListener('blur', function(event) {
                // don't run if it's empty
                if (event.target.value === "") {
                    return true;
                }

                if (event.target.value.slice(-4)[0] === " " || event.target.value.slice(-5)[0] === " ") {
                    return true;
                }

                var amountEntered = Number(event.target.value).toFixed(9).replace(/\d(?=(\d{3})+\.)/g, '$&,').replaceAll("(\\.(\\d*[1-9])?)0+", "$1");
                if (amountEntered[amountEntered.length - 1] === ".") {
                    amountEntered = amountEntered.substring(0, amountEntered.length - 1)
                }
                cryptoInputBox.value = amountEntered + ' ' + coin.symbol;
                
                //Input Crypto Conversion occurs here. Typing in has a delay. I also need to figure out how to get the currency values
                console.log(cryptoInputBox.value);
                console.log(cryptoValueInDollars*100);
                mixpanel.track("Enter Conversion", {
                    "Coin":coin.name, 
                    "Symbol":coin.symbol, 
                    "Price": coin.price, 
                    "Market Cap": coin.marketCap, 
                    "1 Hr %": coin.change1hr, 
                    "24 Hr %": coin.change24hr, 
                    "Input Crypto Value": cryptoInputBox.value,
                    "Converted Fiat Value": (cryptoValueInDollars*100)
                });

            })

            //cleanup fiat inputs on blur
            fiatInputBox.addEventListener('blur', function(event) {
                // don't run if it's empty
                if (event.target.value === "") {
                    return true;
                }

                if (event.target.value[0] === "$") {
                    return true;
                }
                var amountEntered = parseFloat(event.target.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString();
                fiatInputBox.value = '$' + amountEntered;

                // console.log(cryptoInputBox.value);
                mixpanel.track("Enter Conversion", {
                    "Coin":coin.name, 
                    "Symbol":coin.symbol, 
                    "Price": coin.price, 
                    "Market Cap": coin.marketCap, 
                    "1 Hr %": coin.change1hr, 
                    "24 Hr %": coin.change24hr, 
                    "Input Fiat Value": fiatInputBox.value,
                    "Converted Crypto Value": cryptoInputBox.value
                });    
            })

            //pass this whole thing off to render() and show it :)
            app.render(htmlObject, "table")

        },

        viewChart: function(htmlObject, coin) {
            console.log(htmlObject);
            console.log(coin);
            console.log(coin.url);

            htmlObject.children[7].children[0].addEventListener("click", function(event) {
                    chartURL = this;
                    console.log(chartURL);
                    mixpanel.track("View Chart", 
                        {"Chart URL": chartURL.href,
                        "Coin":coin.name, 
                        "Symbol":coin.symbol, 
                        "Price": coin.price, 
                        "Market Cap": coin.marketCap, 
                        "1 Hr %": coin.change1hr, 
                        "24 Hr %": coin.change24hr
                    });
                });

        },


    },

    //this is where we actually 'get' the crypto data (from coinmarketcap)
    allTheCoinData: [],
    getCryptos: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            console.log('fetch crypto prices... \n')

            // this is a little bit magical; but you have seen this pattern before in getRandomName()
            var parser = new DOMParser();
            fetch('https://cors-anywhere.herokuapp.com/https://coinmarketcap.com/all/views/all/').then(function(response) {
                response.text().then(function(html) {
                    //parse html with a headless DOM i can extract from
                    var htmlDoc = parser.parseFromString(html, "text/html");

                    // remove nodes with 'no-data' class as they do not have complete data
                    [].forEach.call(htmlDoc.querySelectorAll('.no-data'), function(e) {
                        e.parentNode.removeChild(e);
                    });

                    // grab the table
                    var tableData = htmlDoc.querySelectorAll('tr');

                    // parse the table
                    tableData.forEach(function(row) {
                        var string = row.outerText
                        var data = string.split("\n")
                        var urlString = row.id.substring(3, row.id.length)
                        var obj = {
                            rank: Number(data[2]),
                            name: data[8].substring(0, 25).trim(),
                            symbol: data[6],
                            marketCap: data[12],
                            price: data[15],
                            supply: data[18],
                            vol24hr: data[21],
                            change1hr: data[24],
                            change24hr: data[25],
                            change7d: data[26],
                            //some... trickery to get the icon
                            icon: row.querySelector('.more-options-cell.dropdown.hide') ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${row.querySelector('.more-options-cell.dropdown.hide').getAttribute('data-cc-id')}.png` : 'failed',
                            url: `https://coinmarketcap.com/currencies/${urlString}`,
                            shortCode: urlString
                        }

                        //push data into allTheCoinData (but ignore the first row)
                        if (data[2] !== 'Name') {
                            self.allTheCoinData.push(obj)
                        }
                    })
                }).then(function() {
                    console.log('... success!')
                    //let the promise know it's done
                    resolve(self.allCoins);
                })
            })
        })
    },

    // getIconData() should return a raw data blob (literally binary bytes) of an image (the coin's icon)
    // buildCoinPickerDiv() delegated that very important task to getIconData()
    // since the caller, buildCoinPickerDiv(), is async, this code also has to be async... 
    // but it had to be async anyway - because it needs to hit a different server to get the icon..
    getIconData: function(coinObject) {
        // ok... so i am once again sorry, this code is a little bit magical
        // normally, when you want to show an image, it's simply <img src="http://path.to/image.png"/>
        // we can't do this... because of this thing called CORS (https://mzl.la/2v7O99f) 
        // CORS prevents us from making http:// requests when serving from a file:// protocol (what we are doing here)
        // so i figured out a way to work-around CORS: https://github.com/Rob--W/cors-anywhere
        // and i found a way to programmatically return raw file data in a 'blob' (literally a readable stream of binary bytes) 
        // and then add that blob to an img's src value: http://bit.ly/2v7Onx7
        return new Promise(function(resolve, reject) {
            const src = `https://cors-anywhere.herokuapp.com/${coinObject.icon}`;
            const options = {
                headers: {
                    'origin': '*' //this is the key as per https://cors-anywhere.herokuapp.com/
                }
            };

            //don't worry if you don't understand this; it's honestly not that important
            fetch(src, options)
                .then(res => res.blob())
                .then(blob => {
                    resolve(blob)
                });
        })
    },

    // memebreak, just for fun :) ... doesn't adhere to our existing style... (but it could be refactored to!)
    memeBreak: function() {
        return new Promise(function(resolve, reject) {
            app.DOM.loader.style.display = "block";
            app.DOM.app.style.display = "none";
            const api_key = 'xh69N50txSiTKdvcLcuLXeATYMWetrUO'; //this right here is literally a password; we should NEVER put passwords inside code like this
            const giphyAPI = 'https://api.giphy.com/v1/gifs/search?q='

            const possibleTerms = ['cryptocurrency', 'crypto', 'hodl', 'deal with it', 'rage comics', 'rage comix', 'keanu', 'glitch', 'money', 'coding', 'javascript', 'dubstep'];
            let searchTerm = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            app.randomMeme = searchTerm;

            fetch(`https://cors-anywhere.herokuapp.com/${giphyAPI}${searchTerm}&api_key=${api_key}&limit=100`).then((response) => response.json()).then((json) => {
                let gifURL = {};
                gifURL.icon = json.data[Math.floor(Math.random() * json.data.length)].images.original.url
                app.getIconData(gifURL).then(function(imageBlob) {
                    let HTMLstring = `<span id="${app.randomMeme}"><img id="memeBreak" class="${app.randomMeme}" /></span><div class="sentiment ${app.randomMeme}"><span class="thumbs ${app.randomMeme}" id="thumbsUp">👍</span>  <span class="thumbs ${app.randomMeme}" id="thumbsDown">👎</span></div>`

                    var htmlObject = document.createElement('div');
                    htmlObject.classList.add('memeBreak')
                    htmlObject.innerHTML = HTMLstring;
                    htmlObject.getElementsByTagName('img')[0].src = URL.createObjectURL(imageBlob);

                    if(app.DOM.app.children[5]) {
                        app.DOM.app.children[5].remove()
                    }

                    app.render(htmlObject, 'app')
                    app.DOM.loader.style.display = "none";
                    app.DOM.app.style.display = "block";
                    resolve(htmlObject)
                    
                    //Track Meme
                    mixpanel.track("View Meme", {"Meme Name": app.randomMeme});

                    //Set People Properties on Number of Views and List of Memes Viewed
                    mixpanel.people.increment("# of Meme Views", 1);
                    mixpanel.people.append("Memes Viewed", app.randomMeme);

                    console.log(app.randomMeme);
                    // console.log(htmlObject.children[0]);
                    // console.log(htmlObject.children[1]);
                    // console.log(htmlObject.children[1].children[0]);  // this is the thumbs up button
                    // console.log(htmlObject.children[1].children[1]);  //this is the thumbs down button
                    // //Add code to create event listeners for the thumbs up and thumbs down

                    // document.getElementById('thumbsUp')
                    const thumbsUp = document.getElementById('thumbsUp') //this pulls the element into something accessible by javascript?
                    // const TUPP = htmlObject.children[1].children[0]
                    // console.log(TUPP);
                    thumbsUp.addEventListener('click', ()=> { mixpanel.track("Like Meme", {
                            "Meme Name": app.randomMeme
                            })
                    }
                    );

                    const thumbsDown = document.getElementById('thumbsDown')
                    thumbsDown.addEventListener('click', ()=> { mixpanel.track("Dislike Meme", {
                            "Meme Name": app.randomMeme
                            })
                    }
                    );

                    // var ThumbsDown = mlObject.children[1].children[1];
                    // console.log(ThumbsUp);
                    // console.log(ThumbsDown);

                    // .addEventListener("click", 
                    //     mixpanel.track("Thumbs Up", {"Thumbs Up Count": "5"}));

                    // htmlObject.children[1].children[1].addEventListener("click", function(event) {
                    //     mixpanel.track("Thumbs Down", {"Thumbs Down Count": "5"});    
                })

            })

        })

    }

}


//start our app! that's all folks!
app.init();




























// ... WAIT... wtf is THIS doing here... "i thought you said 'that's all folks'"
// that should have been all, folks, but i'm afraid there's just one-more-thing ...


// ... sometimes javascript doesn't give you everything you need  ... 
// ... SOMETIMES you have to 'add functionality to the language', which ends up 'altering the environment' ...


// in particular, i needed a 'prototypical' method (a function that lives on all objects of a certain type)
// i wanted a function which would exist on every STRING value in my application
// this method called 'replaceAll()' effectively applies a regular expression (regex) to an ENTIRE string, and then returns that same string
// there's a 'replace()' method that already exists in javascript, but it only 'replaces' the first match it finds
// that didn't work for me so i extended all STRINGS to include a replaceAll() method by using the existing replace() method and applying it recursively
// this basically mirrors any 'find and replace ALL' feature in most text editors, but we can use it in code

// the only place this is actually used is by the 'blur' bindings on the fiat-to-crypto conversion input boxes
// it's how we get those fancy labels and commas when we click out of the input box
// but yea... code like this bad practice (any guesses as to why?)

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};