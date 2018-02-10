var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');

// $('.save-idea-button').on('click', createIdea);
// $('.save-idea-button').on('click', storeIdeaList);

$('.save-idea-button').on('click', function(event) {
  createIdea();
  storeIdeaList();
  event.preventDefault();
  $('#new-item-form').children('input').val('');
});

$('.idea-list').on('click', '.delete-button', deleteIdea);

$( window ).on('load', loadIdeaList);

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

function deleteIdea() {
  $(this).closest('.idea').remove();
  storeIdeaList();
}