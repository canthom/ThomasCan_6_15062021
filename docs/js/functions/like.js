
/**
 * Mise à jour du compte des Likes
 * @function updateLike
 */
function updateLike()  {
  let likesArray = [];
  let likes = document.querySelectorAll('.work__likes');
  likes.forEach( element => {
    likesArray.push(Number(element.textContent));
  });

  const addLike = (acc, val) => acc + val;
  const total = likesArray.reduce(addLike);
  const likesTotal = document.getElementsByClassName('cta__likes')[0];
  likesTotal.innerHTML = total + ` <i class="fas fa-heart"></i>`;
}

export {updateLike};