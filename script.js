var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

$('.save-idea-button').on('click', showAndStoreCard);
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$('.idea-list').on('blur', 'h2', editTitleText);
$('.idea-list').on('blur', 'p', editBodyText);
$('.search-input').on('input', searchIdeas);

$(window).on('load', function() {
  loadIdeaList();
  displayIdeas();
});

function showAndStoreCard(event) {
  event.preventDefault();
  console.log('save idea function')
  createIdea();
  storeIdeaList();
  clearInputs();
};

function createIdea() {
  console.log('create idea')
  var ideaTitleInputValue = $ideaTitleInput.val();
  var ideaBodyInputValue = $ideaBodyInput.val();
  var uniqueId = $.now();
  prependIdea(ideaTitleInputValue, ideaBodyInputValue, uniqueId);
  // add unique id for each card.
}

function prependIdea(title, body, uniqueId) {
  console.log('prepend idea')
  $('.idea-list').prepend(`
    <article class="idea" id="${uniqueId}">
      <h2 aria-label="Idea title" contenteditable="true">${title}</h2> 
      <img tabindex="0" role="button" aria-label="Delete idea" class="delete-button icon" src="icons/delete.svg">
      <p aria-label="Idea body" contenteditable="true">${body}</p>
      <div class="vote-container">
        <div class="vote-buttons-container">
          <img tabindex="0" role="button" aria-label="Increase quality" class="upvote-button icon" src="icons/upvote.svg">
          <img tabindex="0" role="button" aria-label="Decrease quality" class="downvote-button icon" src="icons/downvote.svg">
        </div>
        <p class="idea-quality-container">quality: <span class="idea-quality">swill</span></p>
      </div>  
      <hr>
    </article>
    `);
};

function storeIdeaList() {
  console.log('store idea list')
  var ideaList = $('.idea-list').html();
  var JSONIdeaList = JSON.stringify(ideaList);
  localStorage.setItem('storedIdeaList', JSONIdeaList);
  };

function loadIdeaList() {
  console.log('load idea list')
  var retrievedIdeaList = localStorage.getItem('storedIdeaList');
  var parsedIdeaList = JSON.parse(retrievedIdeaList);
  $('.idea-list').prepend(parsedIdeaList);
};

function deleteIdea() {
  $(this).closest('.idea').remove();
  storeIdeaList();
}

function upvote() {
  console.log('upvote')
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'swill') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('genius');
  }
  storeIdeaList();
}

function downvote() {
  console.log('downvote')
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'genius') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('swill');
  }
  storeIdeaList();
};

function searchIdeas() {
  var searchValue = $(this).val().toLowerCase();
  //  this = search value
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  // this card,    this text of article
  // make this readable!!!!! 
  // check -1 
  console.log('search ideas', this)
  });
}

function clearInputs() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
}

function displayIdeas() {
  console.log('display ideas')
  $('.idea').removeAttr('style');
  // wtf?
}

function editTitleText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeIdeaList();
};

function editBodyText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeIdeaList();
};

