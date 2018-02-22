$('.task-title-input').on('keyup', enableBtn);
$('.task-body-input').on('keyup', enableBtn);
$('.save-btn').on('click', showAndStoreCard);
$('.filter-input').on('input', searchTask);
$('.task-list').on('click', '.upvote-button', upVote);
$('.task-list').on('click', '.downvote-button', downVote);
$('.task-list').on('blur', 'h2', editTitleText);
$('.task-list').on('blur', 'p', editBodyText);
$('.task-list').on('click', '.complete-btn', completeTask);
$('.show-complete-btn').on('click', toggleCompleted);
$('.task-list').on('click', '.delete-button', deleteTask);

$(window).on('load', function() {
  loadTaskList();
});

function loadTaskList() {
  var retrievedTaskList = localStorage.getItem('storedTaskList');
  var parsedTaskList = JSON.parse(retrievedTaskList);
  $('.task-list').prepend(parsedTaskList);
  hideCompletedTask();
};

function hideCompletedTask() {
  $('.task-list').find('.task-complete').hide();
}

function enableBtn(){
  var $titleInput = $('.task-title-input');
  var $bodyInput = $('.task-body-input');
  var $saveBtn = $('.save-btn');
  ($titleInput.val() && $bodyInput.val() ? $saveBtn.removeAttr('disabled', false) : $saveBtn.attr('disabled', true));
}

function showAndStoreCard(event) {
  event.preventDefault();
  createTask();
  storeTaskList();
  clearInputs();
};

function createTask() {
  var taskTitleVal = $('.task-title-input').val();
  var taskBodyVal = $('.task-body-input').val();
  var uniqueId = $.now();
  prependTask(taskTitleVal, taskBodyVal, uniqueId);
}
        
function prependTask(title, body, uniqueId) {
  $('.task-list').prepend(`<article class="task-section" id="${uniqueId}"><section class="task"><h2 class="card__title" aria-label="task title" contenteditable>${title}</h2><button aria-label="Delete task" class="delete-button icon" alt="delete the task"></button><p class="card__body" aria-label="task body" contenteditable>${body}</p></section><section class="vote-container"><button class="complete-btn icon" alt="make task completed or not" ></button><button aria-label="Increase importance" class="upvote-button icon" alt="upvote the "></button><button aria-label="Decrease importance" class="downvote-button icon"></button><p class="task-importance-container">importance: <span class="task-importance">normal</span></p></section><hr></article>`);
};

function storeTaskList() {
  var taskList = $('.task-list').html();
  var JSONTaskList = JSON.stringify(taskList);
  localStorage.setItem('storedTaskList', JSONTaskList);
};

function clearInputs() {
  $('.task-title-input').val('');
  $('.task-body-input').val('');
  $('.task-title-input').focus();
  $('.save-btn').prop('disabled', true);
}

function searchTask() {
  var searchValue = $(this).val().toLowerCase();
  $('.task').filter(function() {
    var taskCard = $(this).parent('.task-section');
    taskCard.toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
  });
}

function upVote() {
  var $importanceLevel = $(this).parentsUntil('.task-section').find('.task-importance').text();
  if ($importanceLevel === 'none') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('low');
  } else if ($importanceLevel === 'low') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('normal');
  } else if ($importanceLevel === 'normal') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('high');
  } else if ($importanceLevel === 'high') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('critical');
  }
  storeTaskList();
}

function downVote() {
  var $importanceLevel = $(this).parentsUntil('.task-section').find('.task-importance').text();
  if ($importanceLevel === 'critical') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('high');
  } else if ($importanceLevel === 'high') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('normal');
  } else if ($importanceLevel === 'normal') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('low');
  } else if ($importanceLevel === 'low') {
    $(this).parentsUntil('.task-section').find('.task-importance').text('none');
  }
  storeTaskList();
};

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

function completeTask() {
  $(this).parent().parent('.task-section').toggleClass('task-complete');
  $(this).toggleClass('completed-task');
  storeTaskList();
}

function toggleCompleted(e) {
  e.preventDefault();
  var $task = $('.task-list').find('.task-complete').toggle();
  $('.task-list').prepend($task);
}

function deleteTask() {
  $(this).closest('.task-section').remove();
  storeTaskList();
}