$(document).ready(function () {
    /** ************** recupération event ******************/
  var events_recup = []
  var event2 = []
  var event1 = {}
        /** methode AJAX POST**/
  function send_event (event_data) {
    var test = JSON.stringify(event_data)
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {
        'vac': test
      },
      url: 'http://localhost:3000/calendar_employee/endpoint',
      success: function (data) {
        console.log('POST DATA' + data)
      },
      error: function (request, error) { // Info Debuggage si erreur
        console.log('Erreur_POST_send_event : responseText: ' + request.responseText)
      }
    })
  }
  var recup_event_ajax = function (start, end, timezone, callback) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'http://localhost:3000/calendar_employee/recup_vacation_for_Emp',
      success: function (event) {
        var events = []
        for (let i = 0; i < event.length; i++) {
          events.push({
            id: event[i].id,
            start: event[i].start,
            end: event[i].end,
            allDay: true,
            eventStartEditable: 'true',
            editable: 'true'
          })
        }
        callback(events)
      },
      error: function (request, error, data) {
        console.log('Erreur_GET_recup_event_ajax : responseText: ' + request.responseText)
      }
    })
  }

        /** * Function fullcalendar ***/
  var calEventStatus = []
  var isEventOverDiv = function (x, y) {
    var events = $('#new_event')
    var offset = events.offset()
    offset.right = events.width() + offset.left
    offset.bottom = events.height() + offset.top
        // Compare
    if (x >= offset.left && y >= offset.top && x <= offset.right && y <= offset.bottom) {
      return true
    }
    return false
  }

  function makeEventsDraggable () {
    $('.fc-draggable').each(function () {
            // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
      })
            // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true, // will cause the event to go back to its
        revertDuration: 0 //  original position after the drag
      })
            // Dirty fix to remove highlighted blue background
      $('td').removeClass('fc-highlight')
    })
    $('#new_event .event').each(function () {
            // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
      })
            // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true, // will cause the event to go back to its
        revertDuration: 0 //  original position after the drag
      })
    })
  }
    // Fullcalendar
  $('#calendar').fullCalendar({
    drop: function (calEvent, date, jsEvent, ui) {
            // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
        $(this).remove()
      }
            // if event dropped from another calendar, remove from that calendar
      if (typeof calEventStatus['calendar'] !== 'undefined') {
        $(calEventStatus['calendar']).fullCalendar('removeEvents', calEventStatus['event_id'])
      }
      makeEventsDraggable()
    },
    select: function (start, end, allDay, ev) {
      var start = prompt('start :', {
        buttons: {
          Ok: true,
          Cancel: false
        }
      })
      if (title) {
        $('#calendar').fullCalendar('renderEvent', {
          title: title,
          start: start,
          end: end,
          allDay: allDay
        }, true)
      }
      $('#calendar').fullCalendar('unselect')
      var startFix = moment($.fullCalendar.formatDate(start, 'YYYY-MM-DD'))
      newCalendar(startFix)
    },
    eventReceive: function (event) {
      makeEventsDraggable()
    },
    eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
      makeEventsDraggable()
    },
    eventDragStart: function (event, jsEvent, ui, view) {
            // Add dragging event in global var
      calEventStatus['calendar'] = '#calendar'
      calEventStatus['event_id'] = event._id
    },
    eventDragStop: function (event, jsEvent, ui, view) {
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        $('#calendar').fullCalendar('removeEvents', event._id)
        var el = $("<div class='event'>").appendTo('#new_event-listing').text(event.title)
        el.draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        })
        el.data('event', {
          title: event.title,
          id: event.id,
          stick: true
        })
      }
      calEventStatus = []
      makeEventsDraggable()
    },
    eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
      makeEventsDraggable()
    },
    viewRender: function () {
      makeEventsDraggable()
    },
    editable: true,
    droppable: true,
    Duration: '08:00:00',
    aspectRatio: 1.8,
    scrollTime: '00:00',
    header: {
      left: 'save saveEvent today prev,next',
      center: 'title',
      right: 'agendaDay,agendaWeek,month,resourceDay,'
    },
    customButtons: {
            /* */
    },
    resourceRender: function (resource, cellEls) {
      cellEls.on('click', function () {
        if (confirm('Are you sure you want to delete ' + resource.title + '?')) {
          $('#calendar').fullCalendar('removeResource', resource)
        }
      })
    },
    resourceLabelText: 'Employee',
    defaultView: 'month',
    events: recup_event_ajax,
    dayClick: function (date, calEvent, jsEvent, view, start, end, allDay) {
      var title = prompt('Event Title:', {
        buttons: {
          Ok: true,
          Cancel: false
        }
      })
      var start = prompt('Event start date : ', {
        buttons: {
          Ok: true,
          Cancel: false
        }
      })
      var end = prompt('Event start date : (AAAA-MM-JJ:hh-mm-ss) ', {
        buttons: {
          Ok: true,
          Cancel: false
        }
      })
      var allDay = confirm('All Day : ', {
        buttons: {
          YES: true,
          NO: false
        }
      })
      var validation = confirm('Validation: ', {
        buttons: {
          YES: true,
          NO: false
        }
      })
      if (title) {
        event1.title = title
        event1.start = start
        event1.end = end
        event2.push(event1)
        $('#calendar').fullCalendar('renderEvent', {
          title: title,
          start: start,
          end: end,
          allDay: allDay
        }, true)
      };
      if (validation == true) {
        send_event(event2)
      }
      $('#calendar').fullCalendar('unselect')
    },
    eventAfterRender: function (event, element, view) {
      var date = new Date()
      if (event.start < date && event.end > date) {
                // event.color = "#FFB347";
        element.css('background-color', '#FFB347')
      } else if (event.start < date && event.end < date) {
                // event.color = "#77DD77";
        element.css('background-color', '#77DD77')
      }
    },
    eventClick: function (calEvent, jsEvent, view) {
      var title = prompt('Event Title:', calEvent.title, {
        buttons: {
          Ok: true,
          Cancel: false
        }
      })
      var validation = confirm('Validation: ', {
        buttons: {
          YES: true,
          NO: false
        }
      })
      var end_date = calEvent.end
      if (end_date == null) {
        end_date = calEvent.start
      }
      if (validation == true) {
        event1 = {
          title: calEvent.title,
          start: calEvent.start,
          end: end_date,
          allDay: calEvent.allDay
        }
        event2.push(event1)
        send_event(event1)
      }
      if (title) {
        calEvent.title = title
        $('#calendar').fullCalendar('updateEvent', calEvent)
      }
    }
  })
})
