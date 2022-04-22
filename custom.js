$(function(){
  $(".item-list .item").click(function(){
    $(".item-detail .item").empty()
    $(this).children().clone().appendTo(".item-detail .item")
  })

  //tooltip
  $(".btn-write").click(function(){
    $(".tooltip").fadeToggle()
  })
})