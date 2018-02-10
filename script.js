var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');

$('.save-idea-button').on('click', createIdea);


function createIdea() {
  var ideaTitleInputValue = $ideaTitleInput.val();
  var ideaBodyInputValue = $ideaBodyInput.val();
  appendIdea(ideaTitleInputValue, ideaBodyInputValue)
}

function appendIdea(title, body) {
  $('.idea-list').append(`
    <h2>${title}</h2> 
    <img class="delete-button icon" src="icons/delete.svg">
    <p>${body}</p>
    <div class="vote-container">
      <img class="upvote-button icon" src="icons/upvote.svg">
      <img class="downvote-button icon" src="icons/downvote.svg">
      <p class="idea-quality-container">quality: <span class="idea-quality">swill</span></p>
    </div>  
    <hr>
    `)
}

