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
$('.show-complete-btn').on('click', toggleCompleted);
$('.critical-btn').on('click', filterCriticalTasks);

$(window).on('load', function() {
  loadTaskList();
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

//WORKS BUT MAYBE NOT FOR UNIQUE IDS?
function storeTaskList() {
  var taskList = $('.task-list').html();
  var JSONTaskList = JSON.stringify(taskList);
  localStorage.setItem('storedTaskList', JSONTaskList);
};

// function storeTaskList() {
//   var taskKey = $('.task-section').attr('id');
//   var taskArticle = $('.task-section').html();
//   var JSONTaskList = JSON.stringify(taskArticle);
//   localStorage.setItem(taskKey, JSONTaskList);
// };
  //now allows for each article to be stored individually------------------ JUST CHANGED. MAY NEED TO REVERT BACK TO OLDER CODE

function loadTaskList() {
  var retrievedTaskList = localStorage.getItem('storedTaskList');
  var parsedTaskList = JSON.parse(retrievedTaskList);
  // $('.task-list').prepend(parsedTaskList);
  // $('.task-list').find('.task-complete').hide();
  showTenTask(parsedTaskList)
};

//DOESN"T WORK YET
function showTenTask(parsedTaskList) {
  var list = parsedTaskList;
  var splitList = list.split('</article>');
  var sleep = splitList.slice(0, 10)
  console.log(sleep)
  $('.task-list').prepend(sleep);
  $('.task-list').find('.task-complete').hide();
}

function toggleCompleted(e) {
  e.preventDefault();
  var $task = $('.task-list').find('.task-complete').toggle();
  $('.task-list').prepend($task);
}

//NOT WORKING YET
function filterCriticalTasks(e){
  e.preventDefault();
  var importanceLevel = $('.task-list').find('.task-importance').text();
  console.log(importanceLevel);
  if(importanceLevel === 'critical'){
    $('.task-list').parents('.task-section').show();
  } else {
    $('.task-list').parents('.task-section').hide();
  }
}

function deleteTask() {
  $(this).closest('.task-section').remove();
  storeTaskList();
}

// $(this).nextAll('button') path to both btns.-------- future code: DISABLES up & downvote btns
function completeTask() {
  $(this).parent().parent('.task-section').toggleClass('task-complete');
  $(this).toggleClass('completed-task');
  storeTaskList();
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

function searchTask() {
  var searchValue = $(this).val().toLowerCase();
  $(".task").filter(function() {
    var taskCard = $(this).parent(".task-section");
    taskCard.toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
  });
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

function clearInputs() {
  $('.task-title-input').val('');
  $('.task-body-input').val('');
  $('.task-title-input').focus();
  $('.save-btn').prop('disabled', true);
}


//IDEAS FOR HAVING 10 CARDS ON THE PAGE
// for each card that is created, we need to have a counter-- and also push that individual card into an array, and then the rest of the cards, push into anothe




//OPTIONS FOR MOVING FORWARD-- UNIQUE IDS VS. FULL HTML IN STORAGE:
//1. continuing on with unique keys for local storage: need to grab id and parse card and then change importance level
//---- create more single responsibility functions to parse, evaluate, stringify cards
//2. REVERTING: using task-list html and counting the number of ids for up to 10 cards on the page
 

//OPTIONS FOR MAKING UPVOTE/DOWNVOTE BTNS SMALLER:
//1. make an array out of the low/high