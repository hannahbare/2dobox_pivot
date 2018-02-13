var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

$('.save-idea-button').on('click', function(event) {
  createIdea();
  clearInputs();
  storeIdeaList();
  event.preventDefault();
  $('#new-item-form').children('input').val('');
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);

$('.idea-list').on('keyup paste input', 'h2', editTitleText);
$('.idea-list').on('keyup paste input', 'p', editBodyText);

$(document).on('input', '.search-input', search);
$(window).on('load', function() {
  loadIdeaList();
  displayIdeas();
});

function createIdea() {
  var ideaTitleInputValue = $ideaTitleInput.val();
  var ideaBodyInputValue = $ideaBodyInput.val();
  prependIdea(ideaTitleInputValue, ideaBodyInputValue)
}

function editTitleText() {
  var newText = $(this).text();
  $(this).html(`<h2 contenteditable="true">${newText}</h2>`);
  storeIdeaList();
  setEndOfContenteditable(this);
};

function editBodyText() {
  var newText = $(this).text();
  $(this).html(`<p contenteditable="true">${newText}</p>`);
  storeIdeaList();
  setEndOfContenteditable(this);
};

function setEndOfContenteditable(contentEditableElement) {
    var range,selection;
    if(document.createRange) {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
};

function prependIdea(title, body) {
  $('.idea-list').prepend(`
    <div class="idea">
      <h2 contenteditable="true">${title}</h2> 
      <img class="delete-button icon" src="icons/delete.svg">
      <p contenteditable="true">${body}</p>
      <div class="vote-container">
        <div class="vote-buttons-container">
          <img class="upvote-button icon" src="icons/upvote.svg">
          <img class="downvote-button icon" src="icons/downvote.svg">
        </div>
        <p class="idea-quality-container">quality: <span class="idea-quality">swill</span></p>
      </div>  
      <hr>
    </div>
    `);
};

function storeIdeaList() {
  var ideaList = $('.idea-list').html();
  var JSONIdeaList = JSON.stringify(ideaList);
  localStorage.setItem('storedIdeaList', JSONIdeaList);
  };

function loadIdeaList() {
  var retrievedIdeaList = localStorage.getItem('storedIdeaList');
  var parsedIdeaList = JSON.parse(retrievedIdeaList);
  $('.idea-list').prepend(parsedIdeaList);
};

function deleteIdea() {
  $(this).closest('.idea').remove();
  storeIdeaList();
}

function upvote() {
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'swill') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('genius');
  }
  storeIdeaList();
}

function downvote() {
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'genius') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('swill');
  }
  storeIdeaList();
};

function search() {
  var searchValue = $(this).val().toLowerCase();
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  });
  storeIdeaList();
}

function clearInputs() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
}

function displayIdeas() {
  $('.idea').removeAttr('style');
}




