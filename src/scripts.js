// script.js
$(document).ready(function() {
    const $stars = $('.stars span');
    const $ratingMessage = $('#rating-message');
    const recipeId = 'receita-bolo-chocolate'; // Identificador único para a receita

    // Recuperar avaliação salva
    const savedRating = localStorage.getItem(recipeId);
    if (savedRating) {
        setRating(parseInt(savedRating, 10));
    }

    // Gerenciar clique em estrelas
    $stars.on('click', function() {
        const rating = $(this).data('value');
        setRating(rating);
        
        // Salvar avaliação no localStorage
        localStorage.setItem(recipeId, rating);
    });

    function setRating(rating) {
        $stars.each(function() {
            const starRating = $(this).data('value');
            $(this).toggleClass('selected', starRating <= rating);
        });
        $ratingMessage.text(`Você avaliou com ${rating} estrela(s)!`);
    }
});
