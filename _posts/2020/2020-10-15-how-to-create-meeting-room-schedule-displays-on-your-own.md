---
layout: post
title: How to create meeting room schedule displays on your own
date: 2020-10-15
header_image: public/confis.jpg
header_position: center
header_overlay: true
category: methods-and-tools
tags: ["display", "outlook", "conference room", "rasberry pi"]
authors: ["Norman"]
about_authors: ["nfranke"]
---

Is the conference room free at the moment?
Or has a colleague already booked it?
Am I interrupting an ongoing meeting?

These and many more questions will surely go through most peoples' minds when they stand in front of a locked conference room.

On the other hand, many people will be familiar with the following situation: You are in a meeting and you are disturbed by colleagues bursting in because they think that the room is free.

To avoid these and other problems, we have thought about building small displays for our conference rooms to give a quick overview of the booked time slots of the respective rooms.
There are some solutions on the market but we have decided to build one ourselves.

As we at ePages regularly employ interns and look for practical and interesting projects, this was a very good opportunity.
Three interns were involved in this project. 
Henri (the first intern) has already set up a working prototype and built a first display. 
Nikolas and Kilian (further interns) have refined and extended it.

The initial prototype with a 3D-printed housing and a small display was then transformed into the final 10.1&Prime; touch display in a cool wooden frame. 
The rudimentary prototype has also changed a lot and an appointment booking option has been added.

{% image_custom image="/assets/img/pages/blog/images/blog-confi-comparison.jpg" width="70" lightbox %}

## The technology behind it

Basically, it can be said that you don't necessarily need to use the structure described below.
This project also aimed to show the interns working on it a variety of technologies.
Since different systems have already been used in the company, we concentrated on using and expanding them.
Not all parts can be reproduced identically and the following lines of code serve as an example and illustration of how such a project can be implemented.

### The data source

As data source and resource management we use the functionality of the resource calendars of [Outlook](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook){:target="_blank"}.
There, we have created a dedicated calendar for each conference room.
All colleagues can use it to book the room for their appointments.
Collisions and double bookings are minimized via the appointment scheduling option.
Nevertheless, this is not completely impossible. 

Outlook offers the possibility of querying these calendars externally using [Exchange Web Services Calls (EWS)](https://docs.microsoft.com/en-us/exchange/client-developer/exchange-web-services/start-using-web-services-in-exchange){:target="_blank"} and displaying the individual entries.

### The intermediate layer / message broker

Since we want to install as less "intelligence" as possible in our displays, we need an intermediate layer that retrieves and prepares the information from Outlook.
We have already developed an internal team website, which collects data from different systems and displays them in a bundled form, the idea of using it here was very obvious.

This team website is based on [Java](https://www.oracle.com/java/){:target="_blank"} and the [Vaadin](https://vaadin.com/){:target="_blank"} framework.
There already exists a connection to our Outlook system via an EWS Java client.
By means of this connection we can simply call up appointments and store these data temporarily.
This information can then be retrieved in the internal network via REST requests.
With the help of this controller, the occupancy of the individual conference rooms can be called up and an overview of the currently available config can be displayed.

{% highlight java %}

// ConfiController.java
...
@RequestMapping(method = RequestMethod.GET, value = "/{confiName}")
@ResponseBody
public ResponseEntity<?> getAppointments(@PathVariable String confiName) throws AMHomeException {
    ArrayList<RoomBooking> roomBookings = new ArrayList<RoomBooking>();
    Calendar displayDate = Calendar.getInstance();
    displayDate.add(Calendar.MINUTE, -60);
    SimpleDateFormat dateFormatter = new SimpleDateFormat("HH:mm");

    Room confi = roomService.findOneByName(confiName.toLowerCase());
    if (confi == null) {
        return new ResponseEntity<String>("Room/Confi not found!", HttpStatus.NOT_FOUND);
    }
    try {
        for (Appointment appointmentItem : ewsClient.getAllAppointmentsforTodayByEmailAdress(confi.getMail())) {
            if (displayDate.getTime().compareTo(appointmentItem.getEnd()) < 0) {
                RoomBooking roomBooking = new RoomBooking(appointmentItem.getSubject(),
                        dateFormatter.format(appointmentItem.getStart()),
                        dateFormatter.format(appointmentItem.getEnd()), appointmentItem.getOrganizer().getName(),
                        appointmentItem.getDisplayTo(),
                        Double.toString(appointmentItem.getDuration().getTotalHours()));
                roomBookings.add(roomBooking);
            }
        }
    } catch (Exception e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    return new ResponseEntity<>(roomBookings, HttpStatus.OK);
}
...
{% endhighlight %}

{% highlight bash %}
➜  ~ curl https://am.epages.network/myrest/confi/base | jq
[
  {
    "subject": "TEST",
    "start": "13:30",
    "end": "13:45",
    "creator": "User 1",
    "attendees": "User1, User2",
    "duration": "0.25"
  },
  {
    "subject": "Test 2",
    "start": "14:45",
    "end": "15:15",
    "creator": "User 2",
    "attendees": "User1, User2",
    "duration": "0.5"
  }
]
{% endhighlight %}


In addition to this, a function was created with which a new appointment for the respective conference room can be created via a REST call.
With this function, you can also create and save a new allocation via the displays later on.
However, this is not intended to replace the actual booking process of the room and should only serve as a quick and easy way of reserving the conference room at short notice.
For this purpose, the start and end times, the reason, and the organizer are required as details.
In order to facilitate the entry on the display, a list is provided for the reason and for the organizer (LDAP user), from which you need to select.
The selection option for the reason is maintained manually as a config file in Git and the list of available organizers is generated from the LDAP directory.

If a room is booked using this function, an EWS request is sent from the team website to the Outlook system and a new appointment entry is generated for the room.
After a few minutes, this entry will appear automatically on the displays.

{% highlight java %}
// EWSClient.java
...
public void createAppointment(String emailAdress, String booker, Date startDate, Date endDate, String title)
        throws URISyntaxException, Exception {

    List<AppointmentTitleType> titleTypes = getAppointmentTitleTypesFromGit();
    AppointmentTitleType titleType = titleTypes.get(Integer.parseInt(title)-1);

    LdapUser ldapBooker = ldapSearcher.getLdapUserByUsername(booker);

    ExchangeService ewsService = getEwsService();
    Appointment appointment = new Appointment(ewsService);
    appointment.setSubject(titleType.getTitle() + " - " + ldapBooker.getName());
    appointment.setBody(new MessageBody("Appointment generated by confi display."));
    appointment.setStart(startDate);
    appointment.setEnd(endDate);
    appointment.getResources().add(emailAdress);
    FolderId folderId = new FolderId(WellKnownFolderName.Calendar, new Mailbox(emailAdress));
    appointment.save(folderId);
    CachedResponses.invalidate(folderId);
}
...
{% endhighlight %}

### The display
For our displays we used a 10.1&Prime; touch display from [Sunfounder](https://www.sunfounder.com/){:target="_blank"} and a [Raspberry Pi 3a+](https://www.raspberrypi.org/products/raspberry-pi-3-model-a-plus/){:target="_blank"}.
The display was embedded in a wooden frame and braced with the help of self-designed and self-printed 3D holders.  

{% image_custom image="/assets/img/pages/blog/images/blog-confi-back-and-front.jpg" width="70" lightbox %}

A minimal installation of [Raspbian](https://www.raspberrypi.org/downloads/raspberry-pi-os/){:target="_blank"} runs on the displays.
This lite version has been converted into a kiosk monitor (a browser without URL input and in full screen mode) using X-Server and Chromium Browser that automatically opens the correct conference room website when starting. 

{% highlight bash %}
➜  ~ sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox chromium-browser

➜  ~ sudo vi /etc/xdg/openbox/autostart

```
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
chromium-browser --disable-infobars --kiosk 'https://confis.vm-intern.epages.com/location/jena/'
```

➜  ~ vi ~/.bash_profile
```
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor
```
{% endhighlight %}

The website is a simple HTML page which uses AJAX requests to retrieve data from our team website and to prepare it nicely.
Every 15 minutes a new request is sent to the intermediate layer to update the occupancy.
It is not necessary to reload the website on the display.

{% highlight html %}
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Confi-Europe</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="../../../fonts/style.css">
    <link rel="stylesheet" type="text/css" href="../../../style.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script type="text/javascript" src="../../../js/config.js"></script>
    <script type="text/javascript" src="../../../js/_tools.js"></script>
    <script type="text/javascript" src="../../../js/update.js"></script>
    <script type="text/javascript" src="../../../js/clock.js"></script>
    <script type="text/javascript" src="../../../js/confi-controller.js"></script>
    <script type="text/javascript">
      window.addEventListener('load', function(evt) {
        console.log(evt);
        if (evt.target !== document) return;

        var confi = "europe";
        const restUrl = `https://am.epages.network/myrest/confi/${confi}`;
  
        updateList(`list-${confi}`, `/myrest/confi/${confi}`);
        showTime();

        setInterval(function(){
          updateList(`list-${confi}`, `/myrest/confi/${confi}`)
        }, 60000000);

    // from: confi-controller.js
    initConfi({
          confi: confi,
          restUrl: restUrl,
          btn: '.confi-header .add-booking-btn'
        });
      });
    </script>
  </head>
  <body onload_="onLoad()">
    <div class="head">
      <a href="../../../index.html"><img src="../../../img/epages.svg"></a>
      <div class="clock">
        <span id="date"></span> | <span id="clockDisplay"></span>
      </div>
    </div>
    <div class="container">
      <div class="europe">
        <div class="confi-header">
        <i class="add-booking-btn fa fa-plus" aria-hidden="true"></i>
          <h1>Confi Europe</h1>
        </div>
        <ul id="list-europe">
          <li>
            <span class="starttime"></span>
            <span class="endtime"></span>
            <span class="title">no appointments</span>
            <span class="topic">nobody</span>
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
{% endhighlight %}

{% highlight js %}
/* confi-controller.js */
const appointments = window.appointments !== undefined ? window.appointments : [
  {name: "weekly",id: 1},
  {name: "SM-Daily",id: 2},
  {name: "Konferenz",id: 3},
  {name: "Bewerbungsgepräch",id: 4}
];

const user = window.user !== undefined ? window.user : [
  {name: "hoasd",id: 'hhoasd'},
  {name: "jürgen",id: 'bjuergen'},
  {name: "helga",id: 'rhelga'},
  {name: "detlef",id: 'wdetlef'}
];

const addBookingHidden = "add-booking-hidden";

/*
 * Renders HTML template for an overlay.
 */
const tmplOverlay = function() {
  const tmpl = `<div class="overlay"></div>`;

  return tmpl;
};


/*
 * Renders HTML template for a dialog wrapper.
 *
 * @params:
 *
 * - tmplVars: object with the following structure
 *             {
 *                title: [string]
 *             }
 */
const tmplDialog = function(tmplVars = {}) {
  tmplVars = Object.assign(
    { close: "Close", add: "Book", title: "Title" },
    tmplVars
  );

  const tmpl = `<div class="add-booking-dialog">
    <div class="add-booking-dialog-header">
        <div>${tmplVars.title}
        </div>
        <i class="add-booking-dialog-close fa fa-times"></i>
    </div>
    <div class="add-booking-dialog-content"></div>
    <div class="add-booking-dialog-footer">
        <button class="add-booking-dialog-add" disabled="true">${tmplVars.add}</button>
        <button class="add-booking-dialog-close">${tmplVars.close}</button>
    </div>
  </div>`;

  return tmpl;
};


const renderSelect = function(select, options) {
  let html = `<select 
    ${select.name ? "name="+select.name : ""} 
    ${select.size ? "size="+select.size : "1"}
    ${select.class ? "class="+select.class : ""}
  >`;

  options.forEach(function(item) {
    html += `<option value="${item.id}">${item.name}</option>`;
  });

  html += `</select>`;

  return html;
} 

/*
 * Renders HTML template for a dialog wrapper.
 *
 * @params:
 *
 * - tmplVars: object with the following structure
 *             {
 *                title: [string]
 *             }
 */
const tmplDialogContent = function(tmplVars = {}) {
  tmplVars = Object.assign(
    { start: "Start", startValue: "", end: "Ende", endValue: "" },
    tmplVars
  );

  const tmpl = `<div class="add-booking-dialog-content-container">
    <div class="add-booking-dialog-row">
        <div class="add-booking-dialog-icon-left fa fa-newspaper-o"></div>
        <div class="add-booking-dialog-col-left">Title:</div>
        <div class="add-booking-dialog-col-right">
          ${renderSelect({name: "appointments", class: "add-booking-dialog-appointments-select"}, appointments)}
        </div>
    </div>
    <div class="add-booking-dialog-row">
        <div class="add-booking-dialog-icon-left fa fa-user"></div>
        <div class="add-booking-dialog-col-left">Arrenger:</div>
        <div class="add-booking-dialog-col-right">
          ${renderSelect({name: "users", class: "add-booking-dialog-users-select"}, user)}
        </div>
    </div>
    <div class="add-booking-dialog-row">
        <div class="add-booking-dialog-icon-left fa fa-calendar"></div>
        <div class="add-booking-dialog-col-left">Date:</div>
        <div class="add-booking-dialog-col-right">
          <input type="date" class= "add-booking-dialog-date-select">
        </div>
    </div>
    <div class="add-booking-dialog-row">
        <div class="add-booking-dialog-icon-left fa fa-hourglass-start"></div>
        <div class="add-booking-dialog-col-left">Begin:</div>
        <div class="add-booking-dialog-col-right">
          <input type="time" class= "add-booking-dialog-time-start-select" disabled=true step="300" />
        </div>
    </div>
    <div class="add-booking-dialog-row">
        <div class="add-booking-dialog-icon-left fa fa-hourglass-end"></div>
        <div class="add-booking-dialog-col-left">End:</div>
        <div class="add-booking-dialog-col-right">
        <input type="time" class= "add-booking-dialog-time-end-select" disabled=true step="300" />
      </div>
    </div>
    <div class="add-booking-dialog-messages add-booking-hidden">
      <div class="add-booking-dialog-col-left">message:</div>
      <div class="add-booking-dialog-message-content"></div>
    </div>
    </div>`;

  return tmpl;
};

const createNodeFromHtmlString = function(htmlString) {
  const elem = document.createElement("div");
  elem.innerHTML = htmlString.trim();
  
  return elem.firstChild;
};

/*
 * Add a certain number of minutes at a time.
 *
 * @params:
 *
 * - startDateTime: Date object - contains the start time
 * - minutes: integer - time in minutes that should be added to the start time
 * 
 * @return
 * 
 * End time as Date object.
 */
const calcEndTime = function(startDateTime, minutes) {
  // convert minutes to milliseconds
  const range =  minutes * 60 * 1000;
  // calculate end time
  const endDateTime = startDateTime.getTime() + range;

  // return end time as Date object
  return new Date(endDateTime);
}

/*
 * Close the dialog by clicking on the overlay.
 *
 * @params:
 *
 * - overlay: DOM node - refereces to the overlay element
 */
const closeDialog = function(overlay) {
  // fireEvent - from ./_tools.js
  fireEvent(overlay, "click");
}

/*
 *send booking data
 *
 * @params: 
 * 
 * - formDataToSend: Data object - includes the item
 * - formData: form Data object - appends item name and value
 */
const sendBookingData = function(formDataToSend,options, overlay) {
  var formData = new FormData();

  formDataToSend.forEach(function(item) {
    // send item name and value
    formData.append(item.name, item.value);
  });

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.

        // close dialog when request was successfully
        // fireEvent - from ./_tools.js
        fireEvent(overlay, "click");
    } else {
      console.log(this.readyState, ", ", this.status);
      if (this.readyState === 4 && this.status === 404) {
        if (options.onAfterRequest && typeof options.onAfterRequest === "function") {
          options.onAfterRequest();
        }
      }
    }
  }
  request.open("POST", options.url);
  request.send(formData);
}
/*
 * Function to configure a confi booking page.
 *
 * @params:
 *
 * - options: object with the following structure
 *             {
 *                confi: [string], // name of the config 'europe', 'america'...
 *                btn: [string]    // selector for the button to add a booking
 *             }
 */
const initConfi = function(options) {
  const confiOptions = Object.assign(
    {
      confi: "europe",
      restUrl: "https://am.epages.network/myrest/confi/europe/create",
      btn: ".confi-header .add-booking-btn"
    },
    options
  );
  // add booking button
  const btn = document.querySelector(confiOptions.btn);

  // variables
  let overlay, dialog;

  // register click event for click button
  btn.addEventListener("click", function() {
    if (overlay === undefined) {
      overlay = createNodeFromHtmlString(tmplOverlay());
      overlay.addEventListener("click", function(evt) {
        if (evt.target === overlay) {
          overlay.classList.add("hide");
        }
      });

      document.querySelector("body").appendChild(overlay);
    }

    // init dialog if necessary
    if (dialog === undefined) {
      dialog = createNodeFromHtmlString(
        tmplDialog({
          title: "Add booking"
        })
      );

      // live - from ./_tools.js
      live(
        ".add-booking-dialog-close",
        "click",
        function(event) {
          closeDialog(overlay);
        },
        dialog
      );
      // live - from ./_tools.js
      live(
        ".add-booking-dialog-add",
        "click",
//        setTimeout("click", 1),
        function(event) {
          // get relevant form data
          let formData = [];

          formData.push({
            name: "title",
            value: dialog.querySelector('.add-booking-dialog-appointments-select').value
          });
          formData.push({
            name: "booker",
            value: dialog.querySelector('.add-booking-dialog-users-select').value
          });
          formData.push({
            name: "date",
            value: dialog.querySelector('.add-booking-dialog-date-select').value
          });
          formData.push({
            name: "start",
            value: dialog.querySelector('.add-booking-dialog-time-start-select').value
          });
          formData.push({
            name: "end",
            value: dialog.querySelector('.add-booking-dialog-time-end-select').value
          });

          sendBookingData(formData, {
            url: confiOptions.restUrl + "/create",
            onAfterRequest: function() {
              closeDialog(overlay);
            }
          }, overlay);
        },
        dialog
      );
      // live - from ./_tools.js
      live(
        ".add-booking-dialog-date-select",
        "input",
        function(event) {
          console.log("select");
          const select = dialog.querySelector(".add-booking-dialog-time-start-select");
          const selectend = dialog.querySelector(".add-booking-dialog-time-end-select");
          const selectbooking = dialog.querySelector(".add-booking-dialog-add");
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
          const msgElement = dialog.querySelector('.add-booking-dialog-messages');

          if (event.target.value !== "" && (new Date(event.target.value)).getTime() >= today.getTime()) {
            select.disabled = false;
            selectbooking.disabled = true;
            
             // add error message to message element
             msgElement.querySelector('.add-booking-dialog-message-content').innerHTML = "";
             // hide message element
             msgElement.classList.add(addBookingHidden);
             // remove error class from input
             event.target.classList.remove('input-error');
          } else {
            select.disabled = true;
            selectend.disabled = true;
            selectbooking.disabled = true;

             // add error message to message element
             msgElement.querySelector('.add-booking-dialog-message-content').innerHTML = "Bitte beachten Sie, dass der ausgewählte Termin nicht hinter dem heutigen  Datum liegt.";
             // show message element
             msgElement.classList.remove(addBookingHidden);
             // add error class from input
             event.target.classList.add('input-error');
          }
        },
        dialog
      );
      live(
        ".add-booking-dialog-time-start-select",
        "change",
        function(event) {
          console.log("select change ... (add-booking-dialog-time-start-select)");
          const select = dialog.querySelector(".add-booking-dialog-time-end-select");
          const addButton = dialog.querySelector(".add-booking-dialog-add");
          const dateSelect = dialog.querySelector(".add-booking-dialog-date-select");
          const startDate = new Date(dateSelect.value);
          const arrTime = event.target.value.split(":");
          const msgElement = dialog.querySelector('.add-booking-dialog-messages');

          if (event.target.value !== "") {
            // add 30min to the select date and time to the End Button
            const endDate = calcEndTime(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), arrTime[0], arrTime[1], 0), 30);
            // add a 0 to the hours and minutes, which are smaller than 10 to get this format: hh:mm
            const hours = (endDate.getHours() < 10? "0": "") + endDate.getHours();
            const minutes = (endDate.getMinutes() < 10? "0": "") + endDate.getMinutes();

            addButton.disabled = false;
            select.disabled = false;
            select.value = hours + ":" + minutes;
             // add error message to message element
             msgElement.querySelector('.add-booking-dialog-message-content').innerHTML = "";
             // hide message element
             msgElement.classList.add(addBookingHidden);
             // remove error class from input
             select.classList.remove('input-error');
          } else {
            select.disabled = true;
          }
        },
        dialog
      );
      live(
        ".add-booking-dialog-time-end-select",
        "change",
        function(event) {
          console.log("select change ... (add-booking-dialog-time-end-select)");
          const select = dialog.querySelector(".add-booking-dialog-add");
          const startTime = dialog.querySelector(".add-booking-dialog-time-start-select").value.split(":");
          const endTime = event.target.value.split(":");
          const msgElement = dialog.querySelector('.add-booking-dialog-messages');

          if (event.target.value !== "") {
            // end time is greater than start time
            if (Number(startTime[0]) * 60 + Number(startTime[1]) < Number(endTime[0]) * 60 + Number(endTime[1])) {
              // enable booking button
              select.disabled = false;
              // add error message to message element
              msgElement.querySelector('.add-booking-dialog-message-content').innerHTML = "";
              // hide message element
              msgElement.classList.add(addBookingHidden);
              // remove error class from input
              event.target.classList.remove('input-error');
            } else {
              // disable booking button
              select.disabled = true;
              // add error message to message element
              msgElement.querySelector('.add-booking-dialog-message-content').innerHTML = "Bitte beachten Sie, dass der Endzeitpunkt größer als der Startzeipunkt gewählt wird.";
              // show message element
              msgElement.classList.remove(addBookingHidden);
              // add error class from input
              event.target.classList.add('input-error');
            }
          } else {
            select.disabled = true;
          }
        },
        dialog
      );
      overlay.appendChild(dialog);

    }
    
    dialog.querySelector(
      ".add-booking-dialog-content"
      ).innerHTML = tmplDialogContent();

    // show overlay
    overlay.classList.remove("hide");
  });
};
{% endhighlight %}

The configuration file for the booking function is loaded automatically when the web page is opened.
This is required for the selection fields when booking a room.

{% highlight javascript %}
/* config.js */
window.appointments = [
    {name: "weekly",id: 1},
    {name: "SM-Daily",id: 2},
    {name: "Konferenz",id: 3},
    {name: "Bewerbungsgepräch",id: 4},
    {name: "Mittagessen",id: 5}
  ];

window.user = [
    {name: 'User 1', id: 'user1'},
    {name: 'User 2', id: 'user2'},
];
{% endhighlight %}

An additional function was built into the team website that generates this file from the existing data.
This way, the file does not have to be maintained manually and can be updated automatically. 

{% highlight java %}
// ConfiController.java
@RequestMapping(method = RequestMethod.GET, value = "/get_config_js")
    @ResponseBody
    public ResponseEntity<?> createConfigJS() {
        String configJS = "window.appointments = [\n";

        for (AppointmentTitleType appointmentTitleType : ewsClient.getAppointmentTitleTypesFromGit()) {

            configJS = configJS + String.format("{name: '%s', id: %s},\n", appointmentTitleType.getTitle(),
                    appointmentTitleType.getId());
        }

        configJS = configJS + "]; \n\n";
        configJS = configJS + "window.user = [\n";

        for (LdapUser ldapUser : ldapSearcher.getAllLdapUsers()) {

            configJS = configJS
                    + String.format("{name: '%s', id: '%s'},\n", ldapUser.getName(), ldapUser.getLdapUserName());
        }

        configJS = configJS + "]; \n\n";

        return new ResponseEntity<>(configJS, HttpStatus.OK);
    }
{% endhighlight %}


By calling this REST request, the return value is the currently valid config.js and the displays are thus updated to the latest configuration status.

With the help of our web designers Caro and Björn, we were able to develop a great frontend.
Here, the current and upcoming bookings for the day are displayed.
For each booking the start and end time, the title, and the organizer are displayed.
If you click on the symbol at the end of the line, the participants are also displayed.
The line fills up the more time of the meeting has passed.
The meeting will then disappear approx. 30 minutes after completion.

<table>
    <tr>
        <td> {% image_custom image="/assets/img/pages/blog/images/blog-confi-snapshot.png" width="70" lightbox %} </td>
        <td> {% image_custom image="/assets/img/pages/blog/images/blog-confi-snapshot-booking.png" width="70" lightbox %} </td>
    </tr>
</table>


## What's next?

With the current version of the displays, we have a working system and we can install them in all our conference rooms.
Our employees can see at a glance which appointments are due for the current day and in which time slots the conference room is occupied.
With the help of the booking function, it is also possible to book the room at short notice.
Now, it is time to put everything through its paces and see whether the system is also successful in everyday life.

For the future it is already planned to provide the booking function with a logic that prevents double bookings.
