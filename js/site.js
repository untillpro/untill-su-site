window.onload = function(){
    $(document.body).addClass('ready');
};

$(() => {
    $('#video_toggler').on('click', () => {
        $('#video_popup').popup({
            "closeText": '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 14 14" enable-background="new 0 0 14 14" xml:space="preserve"><g><line fill="none" stroke="#000000" stroke-miterlimit="10" x1="2.05" y1="11.95" x2="11.95" y2="2.05"/><line fill="none" stroke="#000000" stroke-miterlimit="10" x1="11.95" y1="11.95" x2="2.05" y2="2.05"/></g></svg>'
        });
    });
});