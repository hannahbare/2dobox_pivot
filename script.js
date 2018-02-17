var $taskTitleInput = $('.task-title-input');
var $taskBodyInput = $('.task-body-input');


$('.save-btn').on('click', showAndStoreCard);
$('.task-title-input').on('keyup', enableBtn);
$('.task-body-input').on('keyup', enableBtn);
$('.task-list').on('click', '.delete-button', deleteTask);
$('.task-list').on('click', '.upvote-button', upVote);
$('.task-list').on('click', '.downvote-button', downVote);
$('.task-list').on('blur', 'h2', editTitleText);
$('.task-list').on('blur', 'p', editBodyText);
$('.search-input').on('input', searchTask);

$(window).on('load', function() {
  loadTaskList();
  displayTask();
});

function enableBtn(){
  var $titleInput = $('.task-title-input');
  var $bodyInput = $('.task-body-input');
  ($titleInput.val() && $bodyInput.val() ? $('.save-btn').removeAttr('disabled', false) : $('.save-btn').attr('disabled', true));
}

function showAndStoreCard(event) {
  event.preventDefault();
  createTask();
  storeTaskList();
  clearInputs();
  $('.save-btn').prop('disabled', true);
};

function createTask() {
  var taskTitleVal = $taskTitleInput.val();
  var taskBodyVal = $taskBodyInput.val();
  var uniqueId = $.now();
  prependTask(taskTitleVal, taskBodyVal, uniqueId);
}

function prependTask(title, body, uniqueId) {
  console.log('prepend task')
  $('.task-list').prepend(`
    <article class="task" id="${uniqueId}">
      <section class="task">
        <h2 class="card__title" aria-label="task title" contenteditable>${title}</h2> 

        <img tabindex="0" role="button" aria-label="Delete task" class="delete-button icon" src="icons/delete.svg">
        <p class="card__body" aria-label="task body" contenteditable>${body}</p>
      </section>

      <section class="vote-container">
        <div class="vote-buttons-container">
          <img tabindex="0" role="button" aria-label="Increase quality" class="upvote-button icon" src="icons/upvote.svg">
          <img tabindex="0" role="button" aria-label="Decrease quality" class="downvote-button icon" src="icons/downvote.svg">
        </div>
        <p class="task-quality-container">quality: <span class="task-quality">swill</span></p>
      </section>  
      <hr>
    </article>
    `);
};

function storeTaskList() {
  var taskList = $('.task-list').html();
  var JSONTaskList = JSON.stringify(taskList);
  localStorage.setItem('storedTaskList', JSONTaskList);
  };

function loadTaskList() {
  var retrievedTaskList = localStorage.getItem('storedTaskList');
  var parsedTaskList = JSON.parse(retrievedTaskList);
  $('.task-list').prepend(parsedTaskList);
};

function deleteTask() {
  $(this).closest('.task').remove();
  storeTaskList();
}

function upVote() {
  var $qualityLevel = $(this).parentsUntil('.task').find('.task-quality').text();
  var plausible = $(this).parentsUntil('.task').find('.task-quality').text('plausible');
  var genius = $(this).parentsUntil('.task').find('.task-quality').text('genius');
  ($qualityLevel === 'swill' ? plausible : genius);
  (genius ? next : next)
  storeTaskList();
}

function downVote() {
  console.log('downvote')
  var $qualityLevel = $(this).parentsUntil('.task').find('.task-quality').text();
  if ($qualityLevel === 'genius') {
    $(this).parentsUntil('.task').find('.task-quality').text('plausible');
  } else {
    $(this).parentsUntil('.task').find('.task-quality').text('swill');
  }
  storeTaskList();
};

function searchTask() {
  var searchValue = $(this).val().toLowerCase();
  $(".task").filter(function() {
    var taskCard = $(this).parent(".task");
    taskCard.toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
  });
}

function clearInputs() {
  $taskTitleInput.val('');
  $taskBodyInput.val('');
}

function displayTask() {
  console.log('display tasks')
  $('.task').removeAttr('style');
  // wtf?
}

function editTitleText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeTaskList();
};

function editBodyText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeTaskList();
};

