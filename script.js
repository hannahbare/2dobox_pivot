$('.save-btn').on('click', showAndStoreCard);
$('.task-title-input').on('keyup', enableBtn);
$('.task-body-input').on('keyup', enableBtn);
$('.task-list').on('click', '.delete-button', deleteTask);
$('.task-list').on('click', '.complete-btn', completeTask);
$('.task-list').on('click', '.upvote-button', upVote);
$('.task-list').on('click', '.downvote-button', downVote);
$('.task-list').on('blur', 'h2', editTitleText);
$('.task-list').on('blur', 'p', editBodyText);
$('.filter-input').on('input', searchTask);
$('.show-complete-btn').on('click', showCompleted)

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
  // $('.save-btn').prop('disabled', true);
};

function createTask() {
  var taskTitleVal = $('.task-title-input').val();
  var taskBodyVal = $('.task-body-input').val();
  var uniqueId = $.now();
  prependTask(taskTitleVal, taskBodyVal, uniqueId);
}
        
function prependTask(title, body, uniqueId) {
  console.log('prepend task')
  $('.task-list').prepend(`
    <article class="task-section" id="${uniqueId}">
      <section class="task">
        <h2 class="card__title" aria-label="task title" contenteditable>${title}</h2> 
        <button aria-label="Delete task" class="delete-button icon" alt="delete the task">
        </button>
        <p class="card__body" aria-label="task body" contenteditable>${body}</p>
      </section>
      <section class="vote-container">
        <button class="complete-btn icon" alt="make task completed or not" ></button>
        <button aria-label="Increase importance" class="upvote-button icon" alt="upvote the "></button>
        <button aria-label="Decrease importance" class="downvote-button icon"></button>
        <p class="task-importance-container">importance: <span class="task-importance">swill</span></p>
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
  $('.task-list').find('.task-complete').hide();
};

function showCompleted(e) {
  e.preventDefault();
  $('.task-list').find('.task-complete').show();
}





function deleteTask() {
  $(this).closest('.task-section').remove();
  storeTaskList();
}

function completeTask() {
  $(this).parent().parent('.task-section').toggleClass('task-complete');
  $(this).toggleClass('completed-task');
  storeTaskList();
  // $(this).nextAll('button') path to both btns. 
}

function upVote() {
  var $importanceLevel = $(this).parentsUntil('.task').find('.task-importance').text();
  var plausible = $(this).parentsUntil('.task').find('.task-importance').text('plausible');
  var genius = $(this).parentsUntil('.task').find('.task-importance').text('genius');
  ($importanceLevel === 'swill' ? plausible : genius);
  (genius ? next : next)
  storeTaskList();
}

function downVote() {
  console.log('downvote')
  var $importanceLevel = $(this).parentsUntil('.task').find('.task-importance').text();
  if ($importanceLevel === 'genius') {
    $(this).parentsUntil('.task').find('.task-importance').text('plausible');
  } else {
    $(this).parentsUntil('.task').find('.task-importance').text('swill');
  }
  storeTaskList();
};

function searchTask() {
  var searchValue = $(this).val().toLowerCase();
  $(".task").filter(function() {
    var taskCard = $(this).parent(".task-section");
    taskCard.toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
  });
}

function clearInputs() {
  $('.task-title-input').val('');
  $('.task-body-input').val('');
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

