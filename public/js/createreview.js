const createReview = async (event) => {
    event.preventDefault('');

    const review = document.querySelector('#content').value.trim();
    //if the review has some sort of content. add to user reviews. 
    if (review != null) {
        const response = await fetch('api/users/addreview', {
            method: 'POST',
            body: JSON.stringify({review}),
            headers: {'Content-Type': 'application/json'},
        });
        //clear text box
        if (response.ok) {
            document.querySelector('#content').textContent = '';
        };
        
    } else {
        alert('do not leave review empty');
    };
};
document
    .querySelector('#content')
    .addEventListener('submit', createReview);