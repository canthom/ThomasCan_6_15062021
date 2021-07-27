function updateLike()  {
  let likesArray = [];
  let likes = document.querySelectorAll('.work__likes');
  likes.forEach( element => {
    likesArray.push(Number(element.textContent));
  });
  console.log(likesArray);

  const addLike = (a, b) => a + b;
  const total = likesArray.reduce(addLike);
  const likesTotal = document.getElementsByClassName('cta__likes')[0];
  likesTotal.innerHTML = total + ` <i class="fas fa-heart"></i>`;
};

export {updateLike};