<script>
document.getElementById('search-form').addEventListener('submit', function(e) {
    const query = document.getElementById('search-input').value;
    if (!query.trim()) {
        e.preventDefault();
        alert('Por favor, insira um termo de busca.');
    }
});
</script>
