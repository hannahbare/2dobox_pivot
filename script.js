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
$('.show-complete-btn').on('click', toggleCompleted)

$(window).on('load', function() {
  loadTaskList();
  // displayTask();
});

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
  // console.log('prepend task')
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
        <p class="task-importance-container">importance: <span class="task-importance">normal</span></p>
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
  showTenTask(parsedTaskList)
};

function showTenTask(parsedTaskList) {
    var filter = $('.task-list').filter( ".task" )
    .css('display', 'none' )
  // console.log(parsedTaskList, parsedTaskList.length, filter, 'html: ', HTMLCollection.length)

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

function completeTask() {
  $(this).parent().parent('.task-section').toggleClass('task-complete');
  $(this).toggleClass('completed-task');
  storeTaskList();
  // $(this).nextAll('button') path to both btns. 
}

function upVote() {

  var level = $(this).siblings('p').children('.task-importance').text();
  //current importance level-- normal. very specific to card: returns normal
  var $importanceLevel = $(this).closest().parent('.task').find('.task-importance').text();
  //

  console.log($importanceLevel);

  // if ($importancelevel === 'none') {
  //   level.text('low');
  // } else if ($importancelevel === 'low') {
  //   level.text('normal');
  // } else if ($importancelevel === 'normal') {
  //   level.text('high');
  // } else if ($importancelevel === 'high') {
  //   level.text('critical');
  // }
  // storeTaskList();
}

function downVote() {
  console.log('downvote')
  // var $importanceLevel = $(this).parentsUntil('.task-section').find('.task-importance').text();
  // var cardId = $(this).parent().parent('.task-section').attr('id');
  var cardImportance = $(this).parent().parent('.task-section').find('.task-importance').text();
  console.log(cardImportance);



  // if ($importanceLevel === 'critical') {
  //   $(this).parentsUntil('.task').find('.task-importance').text('high');
  // } else {
  //   $(this).parentsUntil('.task').find('.task-importance').text('normal');
  // }
  // storeTaskList();
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
  $('.task-title-input').focus();
  $('.save-btn').prop('disabled', true);
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

// function displayTask() {
//   console.log('display tasks')
//   $('.task').removeAttr('style');
//   // wtf?
// }
