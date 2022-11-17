"use strict"

$(document).ready(function () {
// $('*').attr('dir', 'auto')

  /* toasts */
  $("#btn1").click(() => {
    toastr.options = {
      closeButton: true,
    }
    toastr.success("Have fun storming the castle!", "Miracle Max Says")
  })
  $("#btn2").click(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
    }
    toastr.warning("Have fun storming the castle!", "Miracle Max Says")
  })
  $("#btn3").click(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
    }
    toastr.error("Have fun storming the castle!", "Miracle Max Says")
  })
  $("#btn4").click(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
    }
    toastr.info("Have fun storming the castle!", "Miracle Max Says")
  })
  $("#btn5").click(() => {
    toastr.clear()
  })

  /* theme toggle */
  const themeToggler = document.getElementById("themeToggler")
  let theme = window.localStorage.getItem("qservTheme") || "light"
  if (theme === "dark") {
    document.body.classList.add("dark-mode")
    themeToggler.setAttribute("checked", "true")
  }

  themeToggler?.addEventListener("click", () => {
    theme = window.localStorage.getItem("qservTheme") || "light"
    if (theme === "light") {
      window.localStorage.setItem("qservTheme", "dark")
    } else {
      window.localStorage.setItem("qservTheme", "light")
    }
    document.body.classList.toggle("dark-mode")
  })

  /* start tables */

  const tableFunction = (tableId, displayLength, ajax) => {
    $("#" + tableId)
      .DataTable({
        ajax,
        dom: "Bfrtip",
        buttons: ["print", "excel"],
        columns: [
          { data: "station" },
          { data: "benzin95" },
          { data: "benzin91" },
          { data: "diesel" },
        ],
        displayLength,

        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: false,
        autoWidth: false,
        responsive: true,
        drawCallback: function (settings) {
          var pagination = $(this)
            .closest(".dataTables_wrapper")
            .find(".dataTables_paginate")
          pagination.toggle(this.api().page.info().pages > 1)
        },
      })
      .buttons()
      .container()
      .appendTo($("#BTNS" + tableId))
  }
  tableFunction("stockTable", 7, "../../dummyData/dummyDataDash.json")
  tableFunction("salesTable", 3, "../../dummyData/dummyDataDash.json")
  tableFunction("table1", 10, "../../dummyData/dummyDataDash.json")

  /* end tables */
})
