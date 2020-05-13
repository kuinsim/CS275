//External client-side Javascript file

function displayLeaderboard() {
    var URL = 'http://localhost:8080/leaderboard'

    $.ajax({
        type: 'GET',
        url: URL,
        data: '{}',
        dataType: 'html',
        success: function(msg) {
            $('').html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $('').html('Error retrieving and displaying leaderboard.')
        }
    })
}