var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

// $('.save-idea-button').on('click', createIdea);
// $('.save-idea-button').on('click', storeIdeaList);

$('.save-idea-button').on('click', function(event) {
  createIdea();
  storeIdeaList();
  event.preventDefault();
  $('#new-item-form').children('input').val('');
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$( window ).on('load', loadIdeaList);

qualityCount = 0;

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
        <img class="upvote-button icon" src="icons/upvote.svg">
        <img class="downvote-button icon" src="icons/downvote.svg">
        <p class="idea-quality-container">quality: <span class="idea-quality">swill</span></p>
      </div>  
      <hr>
    </div>
    `)
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

// function storeQualityCount() {
//   var ideaList = $('.idea-list').html();
//   var JSONIdeaList = JSON.stringify(ideaList);
//   localStorage.setItem('storedIdeaList', JSONIdeaList);
//   };

// function loadQualityCount() {
//   var retrievedIdeaList = localStorage.getItem('storedIdeaList');
//   var parsedIdeaList = JSON.parse(retrievedIdeaList);
//   $('.idea-list').prepend(parsedIdeaList);
// };


function deleteIdea() {
  $(this).closest('.idea').remove();
  storeIdeaList();
}

function upvote() {
  qualityCount++;
  if (qualityCount === 1) {
    $(this).parent().find('.idea-quality').text('plausible');
  } else {
    $(this).parent().find('.idea-quality').text('genius');
    qualityCount = 2;
  }
  storeIdeaList();
}

function downvote() {
  qualityCount--;
  if (qualityCount === 1) {
    $(this).parent().find('.idea-quality').text('plausible');
  } else {
    $(this).parent().find('.idea-quality').text('swill');
    qualityCount = 0;
  }
  storeIdeaList();
};






