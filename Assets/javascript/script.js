$(function () {

  var today = dayjs();
  var saveButtonEl = $('.btn')
  var toDoEl = $('.description')

  $('#currentDay').text(today.format('dddd, MMM DD'))

  // displays a message everytime a user saves to local storage

  function showUpdateMessage() {
    var messageEl = $('#message');
    messageEl.text('Event Saved to Local Storage!');
    messageEl.fadeIn('fast', function() {
      setTimeout(function() {
        messageEl.fadeOut('fast');
      }, 3000);
    });
  }

  // adds save to local storage functionality to save button

  saveButtonEl.on('click', function () {
    var timeBlock = $(this).closest('.time-block');
    var timeBlockId = timeBlock.attr('id');
    var userNote = timeBlock.find('.description').val();

    localStorage.setItem(timeBlockId, userNote);
    showUpdateMessage();
  });

  // adaptively changes the color of time blocks and changes them to past, present, or future class based on time of day

  function updateTimeBlockClasses() {
    var currentHour = today.hour();

    toDoEl.each(function () {
      var timeBlock = $(this).closest('.time-block');
      var timeBlockHour = parseInt(timeBlock.attr('id').split('-')[1]);

      if (timeBlockHour < currentHour) {
        timeBlock.removeClass('present future').addClass('past');
      } else if (timeBlockHour === currentHour) {
        timeBlock.removeClass('past future').addClass('present');
      } else {
        timeBlock.removeClass('past present').addClass('future');
      }
    });

  }

  // gathers users notes from local storage and allows them to persist through a page refresh

  function loadSavedNotes() {
    toDoEl.each(function () {
      var timeBlock = $(this).closest('.time-block');
      var timeBlockId = timeBlock.attr('id'); 
      var userNote = localStorage.getItem(timeBlockId);
      if (userNote) {
        $(this).val(userNote);
      }
    });
};

updateTimeBlockClasses();
loadSavedNotes();
  
});
