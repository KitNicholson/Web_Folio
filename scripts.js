
function test() {
    console.log("it's connected!!");

    console.log(is_touch_enabled());
}

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);
}

function toggleSidebar(sideBarID, menuColumnID, menuOptionsID) {


    var sideBar = document.getElementById(sideBarID);
    var menuColumn = document.getElementById(menuColumnID);
    var menuOptions = document.getElementById(menuOptionsID);
    var width = window.innerWidth;

    // on desktop
    if (width > 700) {

        if (parseInt(sideBar.style.width) > 50) {
            sideBar.style.width = '50px'; // match this to #sideBar

            // match these to #menuColumn
            menuColumn.style.flexDirection = 'column';
            menuColumn.style.gap = '6.5px';
            menuColumn.style.marginLeft = '17px';

            menuOptions.style.marginLeft = '500px' // match this to #menuOptions

        } else {
            sideBar.style.width = '250px'; // match this to #sideBar:hover

            // match these to #sideBar:hover #menuColumn
            menuColumn.style.flexDirection = 'row';
            menuColumn.style.gap = '3px';
            menuColumn.style.marginLeft = '23px';

            menuOptions.style.marginLeft = '27px' // match this to #sideBar:hover #menuOptions
        }
    }

    // on mobile
    if (width <= 700) {
        
        if (parseInt(sideBar.style.height) > 50) {
            sideBar.style.height = '50px'; // match to @ media{ #sideBar }
            menuColumn.style.marginTop = '9px'; //match to @media{ #menuColumn }
        } else {
            sideBar.style.height = '325px'; // match to @media{ #sideBar:hover }
            menuColumn.style.marginTop = '27px'; // match to @media{ #sideBar:hover #menuColumn }
        }
    }

}