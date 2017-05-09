$(function()
{
	resizeWindow();
});

$(window).resize(resizeWindow);

function resizeWindow() {
	$(".FormContent").height($(window).height() - $(".FormDescription").height() - $(".FormButton").height() - 25);
}

function refreshPage() {
	window.location.reload();
}

function closeModalWindowX()
{
	closeModalWindow(getUrlVar('cz_index'));
}