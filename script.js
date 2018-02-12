var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

$('.save-idea-button').on('click', function(event) {
  createIdea();
  storeIdeaList();
  event.preventDefault();
  $('#new-item-form').children('input').val('');
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$(document).on('input', '.search-input', search);
$(window).on('load', loadIdeaList);
$(window).on('load', clearSearch);

function createIdea() {
  var ideaTitleInputValue = $ideaTitleInput.val();
  var ideaBodyInputValue = $ideaBodyInput.val();
  prependIdea(ideaTitleInputValue, ideaBodyInputValue)
}

function prependIdea(title, body) {
  $('.idea-list').prepend(`
    <div class="idea">
      <h2>${title}</h2> 
      <img class="delete-button icon" src="icons/delete.svg">
      <p>${body}</p>
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
  searchValue = $(this).val().toLowerCase();
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  });

  storeIdeaList();
}





